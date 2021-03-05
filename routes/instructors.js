var express = require('express');
var router = express.Router();
const Instructor = require('./../models').Instructor;
const Category = require('./../models').Category;
const sequelize = require('sequelize');
const instructorsResponseEnvelope = require('../api/models/instructor/instructorsResponseEnvelope');
const instructorResponseEnvelope = require('../api/models/instructor/instructorResponseEnvelope');
const validateInstructorRequest = require('./../api/validators/instructorRequestValidator');
const validatorProcessor = require('./../api/utils/validatorProcessor');
const resourceIdDecoder = require('./../api/utils/resourceIdDecoder');
const instructorRequestConverter = require('../api/models/instructor/instructorRequestConverter');

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
  Instructor.findAll({
    include: { model: Category, as: 'Categories' }
  })
    .then(function (data) {
      console.log("retrieved instructors")
      var responseBody = instructorsResponseEnvelope(data, "/instructors", { pageSize: data.length, pageNumber: 1, totalPages: 1 }, []);
      res.json(responseBody)
    }).catch(function (error) {
      console.log(error)
      var errors = validatorProcessor(error)

      res.status(422);
      res.json({
        returnCode: "T0000",
        returnDescription: "Validation errors occurred. Please see details.",
        details: errors
      })
    })
});

router.get('/:instructorId', (req, res, next) => {
  console.log("Received Retrieve Instructor Request for Instructor: " + req.params.instructorId,)

  try {
    instructorId = resourceIdDecoder(req.params.instructorId)
  } catch (error) {
    console.error(error);
    res.status(404);
    res.send();
  }
  Instructor.findOne(
    {
      include: { 
        model: Category,
        as: 'Categories' },
      where: {
        id: instructorId
      }
    }
  )
  .then(function (data) {

      var responseBody = instructorResponseEnvelope(data, "/instructors/" + req.params.instructorId)
      res.json(responseBody)
    }).catch(function (error) {
      console.log(error)
      var errors = validatorProcessor(error)

      res.status(422);
      res.json({
        returnCode: "T0000",
        returnDescription: "Validation errors occurred. Please see details.",
        details: errors
      })
    })
});

router.post('/', (req, res, next) => {

  errors = validateInstructorRequest(req.body)

  if (errors.length == 0) {
    instructor = instructorRequestConverter(req.body)
    Instructor.create(instructor,
      {
        include: {
          model: Category
        }
      })
      .then(function (data) {
        var responseBody = instructorResponseEnvelope(data, "/instructors")
        res.json(responseBody)
      }).catch(function (error) {
        console.log(error)

        errors = validatorProcessor(error)

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
  instructor = instructorRequestConverter(req.body)

  try {
    instructorId = resourceIdDecoder(req.params.instructorId)
  } catch (error) {
    console.error(error);
    res.status(404);
    res.send();
  }
  
  if (errors.length == 0) {
    Instructor.update(instructor, { where: { id: instructorId } }
      ,{
        include: {
          model: Category
        }
      })
      .then(function (instructor) {
        console.log(instructor)
        console.log("updated instructor")
        Instructor.findOne(
          {
            include: { 
              model: Category,
              as: 'Categories' },
            where: {
              id: instructorId
            }
          }
        )
        .then(function (instructorRetrieved) {

            var responseBody = instructorResponseEnvelope(instructorRetrieved, "/instructors/" + req.params.instructorId)
            console.log
            res.json(responseBody)
          }).catch(function (error) {
            console.log(error)
            res.status(404);
            res.send();
          })
      }
      ).catch((error) => {
        // var errors = validatorProcessor(error)
        console.log(error)
        res.status(422);
        res.json({
          returnCode: "T0000",
          returnDescription: "Validation errors occurred. Please see details.",
          details: error
        })
      })
  }
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