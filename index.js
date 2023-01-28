const http = require("http");
const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 5000;

// Init express
const app = express();

// Home page route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "views", "index.html"));
});

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Init server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
