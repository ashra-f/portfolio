// const http = require("http");
const express = require("express");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 5000;

// Init express
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public", "views"));

// Home page route
app.get("/", (req, res) => {
  res.render("index");
});

// Create get gifs API
app.get("/api/gifs", (req, res) => {
  const gifs = [];
  fs.readdir("./public/imgs/michigan-gifs", (err, files) => {
    gifs.push(files);
    res.json(gifs);
  });
});

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Init server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
