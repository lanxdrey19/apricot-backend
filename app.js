const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
require("dotenv/config");

const serversRoute = require("./routes/servers");
const templatesRoute = require("./routes/templates");
const usersRoute = require("./routes/users");

app.use(bodyParser.json());
app.use("/servers", serversRoute);
app.use("/templates", templatesRoute);
app.use("/users", usersRoute);

mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log("Connection to db established");
});

app.listen(3000);
