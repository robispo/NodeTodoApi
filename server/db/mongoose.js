const mongoose = require("mongoose");

const mdOptions = { useNewUrlParser: true };
const url = process.env.MONGODB_URI;

mongoose.Promise = global.Promise;
mongoose.set("useFindAndModify", false);

mongoose.connect(
  url,
  mdOptions
);

module.exports = {
  mongoose
};
