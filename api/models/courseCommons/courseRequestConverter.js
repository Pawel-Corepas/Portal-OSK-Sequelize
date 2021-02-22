function courseRequestConverter(courseRequest,status){
   
    course = {};
    course.Name = courseRequest.name;
    course.Price = courseRequest.price;
    course.Category = courseRequest.category;
    course.HoursOfPractice = courseRequest.hoursOfPractice;
    course.StartDate = courseRequest.startDate;
    course.EndDate = courseRequest.endDate;
    course.AdditionalInfo = courseRequest.additionalInfo;
    course.Status = status
    
    return course

}

module.exports = courseRequestConverter;