const { ObjectID } = require("mongodb");

const { mongoose } = require("../server/db/mongoose");
const { Todo } = require("../server/models/models");

console.clear();

Todo.deleteMany({})
  .then(todos => console.log("find:\n", todos))
  .catch(e => console.log(e));
