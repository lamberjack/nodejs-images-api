"use strict";

// Constants
const express = require("express");
const db = require("./models");
const config = require("./config/config")

const HOST =  config.app.HOST;
const PORT = config.app.PORT;
const app = express();
const initRoutes = require("./routes/web");
global.__basedir = __dirname;

app.use(express.urlencoded({ extended: true }));

initRoutes(app);
db.sequelize.sync();
app.listen(PORT, HOST, () => {
  console.log(`Running Img Store Service at :  ${HOST}:${PORT}`);
});

module.exports = app