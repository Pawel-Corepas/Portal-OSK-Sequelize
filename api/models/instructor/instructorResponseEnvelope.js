const toInstructorModel = require('./instructorResponseBuilder');

function instructorResponseEnvelope(data, uri) {
    var instructorResponseEnvelope = {};

    instructorResponseEnvelope.uri = uri;
    instructorResponseEnvelope.data = toInstructorModel(data);        
    return instructorResponseEnvelope;

}

module.exports = instructorResponseEnvelope 