    const toCourseModel = require('./../../api/models/courseCommons/courseResponseBuilder');

    function coursesResponseEnvelope(data, uri, page, sort) {
        var courseResponseEnvelope = {};
    
        courseResponseEnvelope.uri = uri;
        courseResponseEnvelope.data = toCoursesModel(data);
        courseResponseEnvelope.page = page;
        courseResponseEnvelope.sort = sort;
        
        return courseResponseEnvelope;
    
    }


    function toCoursesModel(courses){
        var data = courses.map((course) =>{
            return toCourseModel(course)

        })
        return data
    }
    module.exports = coursesResponseEnvelope 

