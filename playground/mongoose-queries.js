const { ObjectID } = require("mongodb");

const { mongoose } = require("./../server/db/mongoose");
const { Todo } = require("./../server/models/todo");

var id = "5bbe58a3ddb93d66c18a3b9d*";

console.clear();

if(!ObjectID.isValid(id)){
    console.log("ID not valid");
    return;
}

Todo.find({
  _id: id
})
  .then(todos => console.log("find:\n", todos))
  .catch(e => console.log(e));

Todo.findOne({
  _id: id
})
  .then(todo => {
    if (!todo) {
      console.log("findOne:\nId not found");
      return;
    }
    console.log("findOne:\n", todo);
  })
  .catch(e => console.log(e));

Todo.findById(id)
  .then(todo => {
    if (!todo) {
      console.log("findById:\nId not found");
      return;
    }
    console.log("findById:\n", todo);
  })
  .catch(e => console.log(e));
