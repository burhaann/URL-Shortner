require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Basic Configuration
const port = process.env.PORT || 3000;

console.log("Hello111");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 3000, function () {
      console.log(`Listening on port ${port}`);
    });
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

console.log("Helwewewewewewewewewewewewewewewewewew");
const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to MongoDB Atlas");
});

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
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

const urlSchema = new mongoose.Schema({
  original_url: String,
  short_url: Number,
});

let Url = mongoose.model("Url", urlSchema);

app.post("/api/shorturl", function (req, res) {
  const mongoUrl = new Url({
    original_url: req.body.url,
    short_url: req.body,
  });
  mongoUrl
    .save()
    .then((result) => {
      done(null, result);
    })
    .catch((error) => {
      console.error(error);
    });
  console.log(req.body.url);
  const response = {
    original_url: req.body.url,
    short_url: 1010,
  };
  res.json(response);
});

app.get("/api/shorturl/:shorturl", function (req, res) {
  const short_url = req.params.shorturl;
});

// app.listen(port, function () {
//   console.log(`Listening on port ${port}`);
// });
