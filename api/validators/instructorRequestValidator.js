const Validator = require('validatorjs');

function validateInstructorRequest(request) {
    
 
    fields = ["name", "surname", "email", "mobile", "licenceId"]
  let rules = {
    name: 'required',
    email: 'required|email',
    surname: 'required',
    mobile:'required',
    licenceId:'required|min:7',
    
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