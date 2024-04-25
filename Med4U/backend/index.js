const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const multer = require("multer");

let app = express();
app.use(cors());

const CONNECTION_STRING =
  "mongodb+srv://med4uip:Qwerty123@med4u.6oxncqx.mongodb.net/?retryWrites=true&w=majority&appName=Med4U";
const DATABASE_NAME = "Med4U";

let database;

app.listen(3000, () => {
  MongoClient.connect(CONNECTION_STRING, (error, client) => {
    if (error) {
      console.error("Error connecting to MongoDB:", error);
      return;
    }
    console.log("MongoDB connected successfully");
    database = client.db(DATABASE_NAME);
  });
});

app.get("/backend/test/GetNotes", (request, response) => {
  console.log("Ruta /backend/test/GetNotes a fost apelată."); // Mesaj de consolă
  database
    .collection("Med4U_collection")
    .find({})
    .toArray((error, result) => {
      console.log(result);
      console.log(database);
      response.send(result); // Trimite datele către client sub formă de JSON
    });
});
