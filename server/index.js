const express = require("express");
const config = require("../config.js");

const dbHelpers = require('../database/SQL/helpers.js');
const routes = require('./routes');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.use('/products', routes);

app.listen(config.port, () => {
  console.log("Server listening on port ", config.port);
});

module.exports = app;