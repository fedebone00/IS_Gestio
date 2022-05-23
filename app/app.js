const express = require('express');
const cors = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors());

module.exports = app;