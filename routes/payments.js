var express = require('express');
var router = express.Router();
const Payment = require('./../models').Payment;
const sequelize = require('sequelize');
const validatorProcessor = require('./../api/utils/validatorProcessor');




module.exports = router;