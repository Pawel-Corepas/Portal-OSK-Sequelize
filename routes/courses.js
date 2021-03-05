var express = require('express');
const validateCourseRequest = require('../api/validators/courseRequestValidator');



var router = express.Router();
const Course = require('./../models').Course;
const sequelize = require('sequelize');
const validatorProcessor = require('./../api/utils/validatorProcessor');
const coursesResponseEnvelope = require('../api/models/course/courseResponseEnvelope');
const courseResponseEnvelope = require('../api/models/course/courseResponseEnvelope');
const resourceIdDecoder = require('./../api/utils/resourceIdDecoder');
const courseRequestConverter = require('../api/models/course/courseRequestConverter');



router.get('/', (req, res, next) => {
  Course.findAll()
    .then(function (data) {
      console.log("retrieved courses")
      var responseBody = coursesResponseEnvelope(data, "/courses", { pageSize: data.length, pageNumber: 1, totalPages: 1 }, [])
      res.json(responseBody)
    }).catch(function (error) {
      var errors = validatorProcessor(error)
      console.log(error)
      res.status(422);
      res.json({
        returnCode: "T0000",
        returnDescription: "Validation errors occurred. Please see details.",
        details: errors
      })
    })
});

router.get('/:courseId', (req, res, next) => {
  //var encrypId = resourceIdEncoder(req.params.courseId)
  console.log("Received Retrieve course Request for course: " + req.params.courseId,)
  try {
    courseId = resourceIdDecoder(req.params.courseId)
  } catch (error) {
    console.error(error);
    res.status(404);
    res.send();
  }


  Course.findOne({ where: { id: courseId } })
    .then(function (data) {
      var responseBody = courseResponseEnvelope(data, "/courses/" + req.params.courseId);
      res.json(responseBody)
    }).catch(function (error) {
      var errors = validatorProcessor(error)
        console.log(error)
        res.status(422);
        res.json({
          returnCode: "T0000",
          returnDescription: "Validation errors occurred. Please see details.",
          details: errors
        })
    })
});

router.post('/', (req, res, next) => {

  errors = validateCourseRequest(req.body)

  if (errors.length == 0) {
    course = courseRequestConverter(req.body, "ACTIVE")
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

  errors = validateCourseRequest(req.body)
  course = courseRequestConverter(req.body)
  courseId = resourceIdDecoder(req.params.courseId)
  if (errors.length == 0) {
    console.log("Static validations passed!!")
    Course.update(course, { where: { id: courseId } })
      .then(function () {
        console.log("updated course")
        Course.findOne({ where: { id: courseId } })
          .then(function (courseRetrieved) {
            var responseBody = courseResponseEnvelope(courseRetrieved, "/courses/" + req.params.courseId);
            res.json(responseBody)
          }).catch(function (error) {
            res.json({ er: error })
          })
      }
      ).catch((error) => {
        errors = validatorProcessor(error)
        res.status(422);
        res.json({
          returnCode: "T0000",
          returnDescription: "Validation errors occurred. Please see details.",
          details: errors
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