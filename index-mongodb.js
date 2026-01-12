// const config = require('config');
// const Joi = require('joi');
// Joi.objectid = require('joi-objectid')(Joi);
// const mongoose = require('mongoose');
const express = require('express');
const error = require('./middleware/error');
const winston = require("winston")
const app = express();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/logging')();
require('./startup/config')()
require('./startup/validation')()
require('./startup/prod')(app);
 
app.use(error);

const port = process.env.PORT || 3000;
const server=app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports=server;