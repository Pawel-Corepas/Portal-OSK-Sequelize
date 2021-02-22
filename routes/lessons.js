
var express = require('express');
var router = express.Router();
const Lesson = require('./../models').Lesson;
const sequelize = require('sequelize');
const validatorProcessor = require('./../api/utils/validatorProcessor');


module.exports = router;