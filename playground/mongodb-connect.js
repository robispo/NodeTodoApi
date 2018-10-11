// const MongoClient = require("mongodb").MongoClient;
const { MongoClient, ObjectID } = require("mongodb");

const url = "mongodb://localhost:27017";
const dbName = "TodoApp";

// const obj = new ObjectID();
// console.log(obj);
// console.log(obj.getTimestamp());

MongoClient.connect(
  url,
  { useNewUrlParser: true },
  (e, client) => {
    if (e) {
      console.log(e);
      return;
    }
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    // db.collection("Todos").insertOne(
    //   {
    //     text: "Hello world",
    //     completed: true
    //   },
    //   (e, r) => {
    //     if (e) {
    //       console.log(e);
    //       return;
    //     }
    //     console.log(JSON.stringify(r.ops, undefined, 2));
    //   }
    // );

    // db.collection("Users").insertOne(
    //     {
    //       name: "Rabel",
    //       age:29,
    //       location:"USA"
    //     },
    //     (e, r) => {
    //       if (e) {
    //         console.log(e);
    //         return;
    //       }
    //       console.log(JSON.stringify(r.ops, undefined, 2));
    //     }
    //   );

    client.close();
  }
);
