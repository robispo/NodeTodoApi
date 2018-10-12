const express = require("express");
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");

const { mongoose } = require("./db/mongoose");
const { Todo } = require("./models/todo");
const { User } = require("./models/user");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo
    .save()
    .then(r => {
      res.send(r);
    })
    .catch(e => res.status(400).send(e));
});

app.get("/todos", (req, res) => {
  Todo.find()
    .then(todos => {
      res.send({ todos });
    })
    .catch(e => res.status(400).send(e));
});

app.get("/todos/:id", (req, res) => {
  var todoId = req.params.id;

  if (!ObjectID.isValid(todoId)) {
    res.status(400).send();
    return;
  }

  Todo.findById(todoId)
    .then(todo => {
      if (!todo) {
        res.status(404).send();
        return;
      }

      res.send({ todo });
    })
    .catch(e => {
      console.log(e);
      res.status(400).send();
    });
});

app.delete("/todos/:id", (req, res) => {
  var todoId = req.params.id;

  if (!ObjectID.isValid(todoId)) {
    res.status(400).send();
    return;
  }

  Todo.findByIdAndDelete(todoId)
    .then(todo => {
      if (!todo) {
        res.status(404).send();
        return;
      }

      res.send({ todo });
    })
    .catch(e => {
      console.log(e);
      res.status(400).send();
    });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = { app };
