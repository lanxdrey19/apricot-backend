const express = require("express");

const app = express();

app.use("/", () => {
  console.log("hello");
});

app.listen(3000);

app.get("/", (req, res) => {
  res.send("hello");
});
