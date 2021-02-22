var express = require('express');
var router = express.Router();
const Instructor = require('./../models').Instructor;
const Category = require('./../models').Category;
const sequelize = require('sequelize');
const instructorsResponseEnvelope = require('./../api/models/instructorsResponseEnvelope');
const instructorResponseEnvelope = require('./../api/models/instructorResponseEnvelope');
const validateInstructorRequest = require('./../api/validators/instructorRequestValidator');
const resourceIdEncoder = require('./../api/utils/resourceIdEncoder');
const validatorProcessor = require('./../api/utils/validatorProcessor');

router.get('/testgroupby', function (req, res, next) {
  //this will join the tables and display data  
  Instructor.findAll({ attributes: ["dbName", [sequelize.fn('COUNT', sequelize.col('id')), 'values']], group: "dbName" })
    .then(function (data) {
      res.json({
        uri: "/emps",
        data: data,
        page: 1,
        totalPages: 1
      })
    })
    .catch(function (error) {
      res.json({ er: error })
    })
});

router.get('/', (req, res, next) => {
  Instructor.findAll()
    .then(function (data) {
      console.log("retrieved instructors")
      var responseBody = instructorsResponseEnvelope(data, "/instructors", { pageSize: data.length, pageNumber: 1, totalPages: 1 }, [])
      res.json(responseBody)
    }).catch(function (error) {
      res.json({ er: error })
    })
});

router.get('/:instructorId', (req, res, next) => {
  var encrypId = resourceIdEncoder(req.params.instructorId)
  console.log("Received Retrieve Instructor Request for Instructor: " + req.params.instructorId,)
  Instructor.findOne({ where: { id: req.params.instructorId } })
    .then(function (data) {
      var responseBody = instructorResponseEnvelope(data, "/instructors/" + req.params.instructorId)
      res.json(responseBody)
    }).catch(function (error) {
      res.json({ er: error })
    })
});

router.post('/', (req, res, next) => {

  errors = validateInstructorRequest(req.body)

  if (errors.length == 0 ) {
    Instructor.create(req.body,
      {
        include: {
          model: Category
        }
      })
      .then(function (data) {
        var responseBody = instructorResponseEnvelope(data, "/instructors/")
        res.json(responseBody)
      }).catch(function (error) {
        errors =validatorProcessor(error)
        console.log(error)
        res.status(422);
    res.json({
      returnCode: "T0000",
      returnDescription: "Validation errors occurred. Please see details.",
      details: errors
    })
      })
  } else {

    res.status(400);
    res.json({
      returnCode: "T0000",
      returnDescription: "Validation errors occurred. Please see details.",
      details: errors
    })
  }

});

router.put('/:instructorId', (req, res, next) => {
  //it will add data to department table 

  errors = validateInstructorRequest(req.body)
  if (errors.length == 0 ) {
    Instructor.update(req.body, { where: { id: req.params.instructorId } })
    .then(function () {
      console.log("updated instructor")
      instructor.findOne({ where: { id: req.params.instructorId } })
        .then(function (instructorRetrieved) {
          var responseBody = instructorResponseEnvelope(instructorRetrieved, "/instructors/" + req.params.instructorId)
          res.json(responseBody)
        }).catch(function (error) {
          res.json({ er: error })
        })
    }
    )}
    else {

      res.status(400);
      res.json({
        returnCode: "T0000",
        returnDescription: "Validation errors occurred. Please see details.",
        details: errors
      })
    }
});


module.exports = router;