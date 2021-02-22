var express = require('express');
const validateCourseRequest = require('../api/validators/courseRequestValidator');



var router = express.Router();
const Course = require('./../models').Course;
const sequelize = require('sequelize');
const validatorProcessor = require('./../api/utils/validatorProcessor');
const coursesResponseEnvelope = require('../api/models/coursesResponseEnvelope');
const courseResponseEnvelope = require('./../api/models/courseResponseEnvelope');
const resourceIdEncoder = require('./../api/utils/resourceIdEncoder');
const courseRequestConverter = require('../api/models/courseCommons/courseRequestConverter');



router.get('/', (req, res, next) => {
    Course.findAll()
      .then(function (data) {
        console.log("retrieved courses")
        var responseBody = coursesResponseEnvelope(data, "/courses", { pageSize: data.length, pageNumber: 1, totalPages: 1 }, [])
        res.json(responseBody)
      }).catch(function (error) {
        res.json({ er: error })
      })
  });
  
  router.get('/:courseId', (req, res, next) => {
    //var encrypId = resourceIdEncoder(req.params.courseId)
    console.log("Received Retrieve course Request for course: " + req.params.courseId,)
    Course.findOne({ where: { id: req.params.courseId } })
      .then(function (data) {
        var responseBody = courseResponseEnvelope(data, "/courses/" + resourceIdEncoder(req.params.courseId));
        res.json(responseBody)
      }).catch(function (error) {
        console.log(error)
        res.json({ er: error })
      })
  });
  
  router.post('/', (req, res, next) => {
  
      errors = validateCourseRequest(req.body)
      
    if (errors.length == 0 ) {
      course = courseRequestConverter(req.body,"ACTIVE")
      Course.create(course)
        .then(function (data) {
          var responseBody = courseResponseEnvelope(data, "/courses")
          res.json(responseBody)
        }).catch(function (error) {
          errors = validatorProcessor(error)
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
  
  router.put('/:courseId', (req, res, next) => {
    //it will add data to department table 
  
    //errors = validateCourseRequest(req.body)
    errors = [];
    if (errors.length == 0 ) {
        Course.update(req.body, { where: { id: req.params.courseId } })
      .then(function () {
        console.log("updated course")
        Course.findOne({ where: { id: req.params.courseId } })
          .then(function (courseRetrieved) {
           var responseBody = courseResponseEnvelope(courseRetrieved, "/courses/" + resourceIdEncoder(req.params.courseId));
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