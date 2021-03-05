
const toCourseModel = require('./courseResponseBuilder');
function courseResponseEnvelope(data, uri) {
    var courseResponseEnvelope = {};

    courseResponseEnvelope.uri = uri;
    courseResponseEnvelope.data = toCourseModel(data);        
    return courseResponseEnvelope;

}

module.exports = courseResponseEnvelope 