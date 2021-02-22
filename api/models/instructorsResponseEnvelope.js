
    function instructorsResponseEnvelope(data, uri, page, sort) {
        var instructorResponseEnvelope = {};
    
        instructorResponseEnvelope.uri = uri;
        instructorResponseEnvelope.data = toInstructorsModel(data);
        instructorResponseEnvelope.page = page;
        instructorResponseEnvelope.sort = sort;
        
        return instructorResponseEnvelope;
    
    }


    function toInstructorsModel(instructors){
        var data = instructors.map((instructor) =>{
            instructor.dataValues.uri= "/instructors/" + instructor.id
            return instructor

        })
        return data
    }
    module.exports = instructorsResponseEnvelope 

