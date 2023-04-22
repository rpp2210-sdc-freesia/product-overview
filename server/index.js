const express = require("express");
const config = require("../config.js");

const dbHelpers = require('../database/NoSQL/helpers.js');

// const db = require('../database/SQL/index.js');

const app = express();

app.use(express.json());

app.listen(config.port, () => {
  console.log("Server listening on port ", config.port);
});