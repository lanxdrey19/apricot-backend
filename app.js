const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
require("dotenv/config");

const serversRoute = require("./routes/servers");
const templatesRoute = require("./routes/templates");
const usersRoute = require("./routes/users");
const cardsRoute = require("./routes/cards");
const tagsRoute = require("./routes/tags");
const tokensRoute = require("./routes/tokens");
const timersRoute = require("./routes/timers");
const dropsRoute = require("./routes/drops");

app.use(bodyParser.json());
app.use("/servers", serversRoute);
app.use("/templates", templatesRoute);
app.use("/users", usersRoute);
app.use("/cards", cardsRoute);
app.use("/tags", tagsRoute);
app.use("/tokens", tokensRoute);
app.use("/timers", timersRoute);
app.use("/drops", dropsRoute);

mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log("Connection to db established");
});

app.listen(3000);
