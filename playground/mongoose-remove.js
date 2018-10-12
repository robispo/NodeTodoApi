const { ObjectID } = require("mongodb");

const { mongoose } = require("../server/db/mongoose");
const { Todo } = require("../server/models/models");

console.clear();

// Todo.deleteMany({})
//   .then(todos => console.log("find:\n", todos))
//   .catch(e => console.log(e));

Todo.findByIdAndDelete("5bbfdb66fbc74adad32ad064")
  .then(todo => console.log("Remove:\n", todo))
  .catch(e => console.log(e));
