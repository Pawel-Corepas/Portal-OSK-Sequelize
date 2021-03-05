
const resourceIdEncoder = require('../../utils/resourceIdEncoder');

function toCourseModel(course){
   
    data = {};
    data.id = resourceIdEncoder(course.id)
    data.uri = "/courses/" + data.id;
    data.name = course.Name;
    data.price = course.Price;
    data.category = course.Category;
    data.hoursOfPractice = course.HoursOfPractice;
    data.startDate = course.StartDate;
    data.endDate = course.EndDate;
    data.additionalInfo = course.AdditionalInfo;
    data.status= course.Status;
    data.createdAt = course.createdAt;
    data.updatedAt = course.updatedAt;
    return data

}

module.exports = toCourseModel;