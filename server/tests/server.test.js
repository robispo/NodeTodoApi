const expect = require("expect");
const request = require("supertest");
const { ObjectID } = require("mongodb");

const { app } = require("./../server");
const { Todo } = require("./../models/models");

const todosDumi = [
  {
    _id: new ObjectID(),
    text: "1"
  },
  {
    _id: new ObjectID(),
    text: "2"
  },
  {
    _id: new ObjectID(),
    text: "Test update",
    completed: true,
    completedAt: new Date().getTime()
  }
];

//Delete all the Todos before run the test.
beforeEach(done => {
  Todo.deleteMany({})
    .then(() => Todo.insertMany(todosDumi))
    .then(() => done())
    .catch(e => done(e));
});

describe("GET /todos", () => {
  it("should get all todos", done => {
    request(app)
      .get("/todos")
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBeGreaterThan(0);
      })
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }

        done();
      });
  });
});

describe("GET /todos/:id", () => {
  it("should get a todo by its id", done => {
    request(app)
      .get(`/todos/${todosDumi[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo).toExist();
        expect(res.body.todo.text).toBe(todosDumi[0].text);
      })
      .end(done);
  });

  it("should get a 404 - id not found", done => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it("should get a 400 - id not valid", done => {
    request(app)
      .get("/todos/123")
      .expect(400)
      .end(done);
  });
});

describe("POST /todos", () => {
  it("should create a new todo", done => {
    var text = "Salir";
    var todoLength = 0;

    Todo.find()
      .then(t => (todoLength = t.length))
      .catch(e => console.log(e));

    request(app)
      .post("/todos")
      .send({ text })
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }

        Todo.find()
          .then(t => {
            expect(t.length).toBe(todoLength + 1);
            expect(t[todoLength].text).toBe(text);
            done();
          })
          .catch(e => done(e));
      });
  });

  it("should not create a new todo with invalid body data", done => {
    var todoLength = 0;

    Todo.find()
      .then(t => (todoLength = t.length))
      .catch(e => console.log(e));

    request(app)
      .post("/todos")
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }

        Todo.find()
          .then(t => {
            expect(t.length).toBe(todoLength);
            done();
          })
          .catch(e => done(e));
      });
  });
});

describe("DELETE /todos/:id", () => {
  it("should get a 404 - id not found", done => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it("should get a 400 - id not valid", done => {
    request(app)
      .delete("/todos/123")
      .expect(400)
      .end(done);
  });

  it("should delete a todo by its id", done => {
    var hexId = todosDumi[0]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo).toExist();
        expect(res.body.todo.text).toBe(todosDumi[0].text);
      })
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }

        Todo.findById(hexId)
          .then(r => {
            expect(r).toNotExist();
            done();
          })
          .catch(e => done(e));
      });
  });
});

describe("PATCH /todos/:id", () => {
  it("should update a todo", done => {
    var hexId = todosDumi[0]._id.toHexString();
    var body = { text: "Testing PATCH method.", completed: true };

    request(app)
      .patch(`/todos/${hexId}`)
      .send(body)
      .expect(200)
      .expect(res => {
        expect(res.body.todo).toExist();
        expect(res.body.todo.text).toBe(body.text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA("number");
      })
      .end(done);
  });

  it("should clear completedAt when todo is not completed", done => {
    var hexId = todosDumi[2]._id.toHexString();
    var body = { text: "Testing PATCH method, completed to false.", completed: false };

    request(app)
      .patch(`/todos/${hexId}`)
      .send(body)
      .expect(200)
      .expect(res => {
        expect(res.body.todo).toExist();
        expect(res.body.todo.text).toBe(body.text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toNotExist();
      })
      .end(done)
  });
});
