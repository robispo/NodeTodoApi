const { MongoClient, ObjectID } = require("mongodb");

const url = "mongodb://localhost:27017";
const dbName = "TodoApp";

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

    // db.collection("Todos")
    //   //.find({ completed: false })
    //   .find({ _id: new ObjectID("5bb5210c7e805b2937e5b5c4") })
    //   .toArray()
    //   .then(r => {
    //     console.log("Todos\n", JSON.stringify(r, undefined, 2));
    //     client.close();
    //   })
    //   .catch(e => {
    //     console.log(e);
    //     client.close();
    //   });

    // db.collection("Todos")
    // .find()
    // .count()
    // .then(r => {
    //   console.log(`Todos count ${r}`);
    //   client.close();
    // })
    // .catch(e => {
    //   console.log(e);
    //   client.close();
    // });

    db.collection("Users")
      .find({ name: "Rabel" })
      .toArray()
      .then(r => {
        console.log("Users\n", JSON.stringify(r, undefined, 2));
        client.close();
      })
      .catch(e => {
        console.log(e);
        client.close();
      });
  }
);
