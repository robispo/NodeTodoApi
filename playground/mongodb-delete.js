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
    //   .deleteMany({ text: "Test" })
    //   .then(r => {
    //     console.log("Todos Delete Many\n", JSON.stringify(r, undefined, 2));
    //     client.close();
    //   })
    //   .catch(e => {
    //     console.log(e);
    //     client.close();
    //   });

    // db.collection("Todos")
    // .deleteOne({ text: "deleteOne" })
    // .then(r => {
    //   console.log("Todos Delete One\n", JSON.stringify(r, undefined, 2));
    //   client.close();
    // })
    // .catch(e => {
    //   console.log(e);
    //   client.close();
    // });

    db.collection("Todos")
      .findOneAndDelete({ completed: false })
      .then(r => {
        console.log(
          "Todos FindOne and Delete\n",
          JSON.stringify(r, undefined, 2)
        );
        client.close();
      })
      .catch(e => {
        console.log(e);
        client.close();
      });
  }
);
