const { ObjectID } = require("mongodb");

const { mongoose } = require("../server/db/mongoose");
const { Todo } = require("../server/models/models");

console.clear();

// Todo.deleteMany({})
//   .then(todos => console.log("DeteleMany:\n", todos))
//   .catch(e => console.log(e));

// Todo.findByIdAndDelete("5bbfdb66fbc74adad32ad064")
//   .then(todo => console.log("FindByIdAndDelete:\n", todo))
//   .catch(e => console.log(e));

Todo.findOneAndDelete("5bbfe47efbc74adad32ad1f7")
  .then(todo => console.log("FindOneAndDelete:\n", todo))
  .catch(e => console.log(e));
