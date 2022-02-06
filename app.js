const express = require("express");
require("dotenv/config");
const mongoose = require("mongoose");

const app = express();

app.use("/", () => {
  console.log("middleware called");
});

mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log("Connection to db established");
});

app.listen(3000);

app.get("/", (req, res) => {
  res.send("/ is called");
});
