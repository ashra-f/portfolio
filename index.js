const http = require("http");
const PORT = process.env.PORT || 5000;
const express = require("express");

// Init express
const app = express();

app.get("/", (req, res) => {
  // load index.html
  res.sendFile(__dirname + "/public/views/index.html");
});

// Init server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
