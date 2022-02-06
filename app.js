const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
require("dotenv/config");

const serversRoute = require("./routes/servers");

app.use(bodyParser.json());
app.use("/servers", serversRoute);

mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log("Connection to db established");
});

app.listen(3000);
