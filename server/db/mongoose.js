const mongoose = require("mongoose");

const dbName = "TodoApp";
const port = 27017;
const mdOptions = { useNewUrlParser: true };
const urlLocal = `mongodb://localhost:${port}/${dbName}`;
const url = process.env.MONGODB_URI || urlLocal;

mongoose.Promise = global.Promise;
mongoose.connect(
  url,
  mdOptions
);

module.exports = {
  mongoose
};
