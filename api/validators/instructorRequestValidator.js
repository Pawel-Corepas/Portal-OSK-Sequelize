const Validator = require('validatorjs');

function validateInstructorRequest(request) {
    
 
    fields = ["Name", "Surname", "Email", "Mobile", "LicenceId"]
  let rules = {
    Name: 'required',
    Email: 'required|email',
    Surname: 'required',
    Mobile:'required',
    LicenceId:'required|min:7',
    
  };

  let validation = new Validator(request, rules);
  var errorDetails = []
  fields.map(
    (fieldName) => {
      validation.fails(
        () => {
          fieldHasErrors = validation.errors.has(fieldName)
          if (fieldHasErrors) {
            errorData = {
              field: fieldName,
              description: validation.errors.first(fieldName)

            }
            errorDetails.push(errorData)

          }
        })
    }
  )

  return errorDetails

};

module.exports = validateInstructorRequest 