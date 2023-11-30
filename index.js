require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Basic Configuration
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB Atlas");
});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.post("/api/shorturl", function (req, res) {
  const url = req.body;
  console.log(url);
  response = {
    original_url: url,
    short_url: url,
  };
  res.json(response);
});

app.get("/api/shorturl/:shorturl", function (req, res) {
  const short_url = req.params.shorturl;
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
