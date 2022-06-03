const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser")

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(bodyParser.json())

module.exports = app;