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
    const cName = "Users";

    // db.collection("Todos")
    //   .findOneAndUpdate(
    //     {
    //       _id: new ObjectID("5bb52b0e7e805b2937e5b6ff")
    //     },
    //     {
    //       $set: {
    //         completed: true
    //       }
    //     },
    //     {
    //       returnOriginal: false
    //     }
    //   )
    //   .then(r => {
    //     console.log(
    //       "Todos FindOne and Update\n",
    //       JSON.stringify(r, undefined, 2)
    //     );
    //     client.close();
    //   })
    //   .catch(e => {
    //     console.log(e);
    //     client.close();
    //   });

    db.collection(cName)
      .findOneAndUpdate(
        {
          _id: new ObjectID("5bb4f2ab5de6c15f05b8f4bc")
        },
        {
          $set: {
            name: "Idelkis"
          },
          $inc: {
            age: 3
          }
        }
      )
      .then(r => {
        console.log(
          `${cName} FindOne and Update\n${JSON.stringify(r, undefined, 2)}`
        );
        client.close();
      })
      .catch(e => {
        console.log(e);
        client.close();
      });
  }
);
