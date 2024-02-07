// Import necessary modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Maindata = require("./models/data");

// Create an Express app
const app = express();
const mongoose = require("mongoose");

// Middleware to parse request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;
const CONNECTION_STRING =
  "mongodb+srv://srinivaspa374:Sreenivas374@cluster0.zqy2rpb.mongodb.net/?retryWrites=true&w=majority";

// Enable CORS
app.use(cors());

mongoose
  .connect(CONNECTION_STRING)
  .then(() => {
    app.listen(PORT || 5000, (err) => {
      if (err) {
        console.log("Error");
      }
      console.log("Server running");
    });
  })
  .catch((err) => {
    console.log(err);
  });

const connection = mongoose.connection;

connection.on("error", console.error.bind(console, "connection error:"));
connection.once("open", async function () {
  const collection = await connection.db.collection("Maindata");
  collection.find({}).toArray(function (err, data) {
    console.log(data); // it will print your collection data
  });
});

app.get("/api/data", async (req, res) => {
  const data = await Maindata.find({});
  res.send(data);
});

app.get("/api/data/:name", async (req, res) => {
  const name = req.params.name;
  const person = await Maindata.findOne({ name: name });
  if (person) {
    res.send(person);
  } else {
    res.send("error");
  }
});

app.post("/api/data/create", async (req, res) => {
  try {
    const emp = await Maindata.create(req.body);
    res.send(emp);
  } catch (error) {
    console.error("Error inserting document:", error);
  }
});
