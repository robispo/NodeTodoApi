require("./config/config");

const express = require("express");
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");
const _ = require("lodash");

const { mongoose } = require("./db/mongoose");
const { Todo, User } = require("./models/models");

const app = express();
const port = process.env.PORT;

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
    .catch(() => res.status(400).send());
});

app.get("/todos", (req, res) => {
  Todo.find()
    .then(todos => {
      res.send({ todos });
    })
    .catch(() => res.status(400).send());
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
    .catch(() => res.status(400).send());
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
    .catch(() => res.status(400).send());
});

app.patch("/todos/:id", (req, res) => {
  var todoId = req.params.id;

  if (!ObjectID.isValid(todoId)) {
    res.status(400).send();
    return;
  }

  var body = _.pick(req.body, ["text", "completed"]);

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(todoId, { $set: body }, { new: true })
    .then(todo => {
      if (!todo) {
        res.status(404).send();
        return;
      }

      res.send({ todo });
    })
    .catch(() => res.status(400).send());
});

app.post("/users", (req, res) => {
  var body = _.pick(req.body, ["email", "password"]);
  var user = new User(body);

  user
    .save()
    .then(() => user.generateAuthToken())
    .then(token => res.header("x-auth", token).send(user))
    .catch(e => res.status(400).send(e));
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = { app };
