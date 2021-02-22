function validatorProcessor(errors) {
    var errors =errors.errors
    var errorDetails = []
    errors.map((error)=>{
        errorData = {
            field: error.path.split('.')[1],
            description: error.message.replace(error.path,error.path.split('.')[1])
    
          }

          errorDetails.push(errorData)
    })

    return errorDetails;
 
}

module.exports = validatorProcessor
