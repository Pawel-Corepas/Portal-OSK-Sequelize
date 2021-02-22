function instructorResponseEnvelope(data, uri) {
    var instructorResponseEnvelope = {};

    instructorResponseEnvelope.uri = uri;
    instructorResponseEnvelope.data = toInstructorModel(data);        
    return instructorResponseEnvelope;

}


function toInstructorModel(instructor){
        instructor.dataValues.uri= "/instructors/" + instructor.id
        return instructor

}
module.exports = instructorResponseEnvelope 