require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Basic Configuration
const port = process.env.PORT || 3000;

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

let counter = 1;

app.post("/api/shorturl", async function (req, res) {
  const url = req.body.url;
  console.log(db.collection.countDocuments();
  try {
    const existingUrl = await Url.findOne({ original_url: url });

    if (existingUrl) {
      res.json({
        original_url: existingUrl.original_url,
        short_url: existingUrl.short_url,
      });
    } else {
      const newUrl = new Url({ original_url: url, short_url: counter++ });
      await newUrl.save();
      res.json({
        original_url: newUrl.original_url,
        short_url: newUrl.short_url,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }

  // const mongoUrl = new Url({
  //   original_url: url,
  //   short_url: 1010,
  // });
  // mongoUrl
  //   .save()
  //   .then((result) => {
  //     // done(null, result);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  // console.log(url);

  // const response = {
  //   original_url: url,
  //   short_url: 1010,
  // };
  // res.json(response);
});

app.get("/api/shorturl/:shorturl", function (req, res) {
  const short_url = req.params.shorturl;
});

// app.listen(port, function () {
//   console.log(`Listening on port ${port}`);
// });
