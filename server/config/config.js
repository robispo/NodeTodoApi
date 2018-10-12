const env = process.env.NODE_ENV || "development";
const url = "mongodb://localhost:27017/TodoApp";

if (env !== "production") {
  process.env.PORT = 3000;
}

if (env === "development") {
  process.env.MONGODB_URI = url;
} else {
  if (env === "test") {
    process.env.MONGODB_URI = url + "Test";
  }
}
