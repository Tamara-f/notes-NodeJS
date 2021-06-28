const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { HttpCode } = require('./helpers/constants');
const routerNotes = require('./routes/routerNotes');

const app = express();

app.use(cors());
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: false })); //'content-type: application / x-www-form-urlencoded'

app.use('/notes', routerNotes);

app.use(function (req, res, next) {
  res
    .status(HttpCode.NOT_FOUND)
    .json({ err: HttpCode.NOT_FOUND, message: 'Use API /notes' });
});

app.use(function (err, req, res, next) {
  res
    .status(HttpCode.INTERNAL_SERVER_ERROR)
    .json({ err: HttpCode.INTERNAL_SERVER_ERROR, message: err.message });
});

module.exports = app;
