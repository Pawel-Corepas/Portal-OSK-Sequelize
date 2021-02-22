const Validator = require('validatorjs');
//Validator.useLang('pl');
function validateCourseRequest(request) {
   Validator.register('minValue', function(value, requirement, attribute) { // requirement parameter defaults to null
     return value > requirement;
   }, 'The :attribute  value has to be greather than 0' );

  fields = ["name", "price", "category", "hoursOfPractice", "startDate", "endDate", "additionalInfo"]
  let rules = {
    name: 'required|max:140',
    price: ['numeric','minValue:0'],
    category: ['required', { 'in': ["A","A1","A2","AM","B","B1","C","CE","D","DE","T"] }],
    hoursOfPractice: ['integer','minValue:0'],
    startDate: 'required|date',
    endDate: 'date|after_or_equal:startDate',
    additionalInfo: 'max:140'
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




module.exports = validateCourseRequest 