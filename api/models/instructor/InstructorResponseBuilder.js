
const resourceIdEncoder = require('../../utils/resourceIdEncoder');

function toinstructorModel(instructor){
   
    data = {};
    data.id = resourceIdEncoder(instructor.id)
    data.uri = "/instructors/" + data.id;
    data.name = instructor.Name;
    data.surname = instructor.Surname;
    data.email = instructor.Email;
    data.mobile = instructor.Mobile;
    data.licenceId = instructor.LicenceId;
    categories = buildCategories(instructor.Categories)
    data.categories = categories;
    data.createdAt = instructor.createdAt;
    data.updatedAt = instructor.updatedAt;
    
    return data

}

function buildCategories(categories){
    if (categories==undefined){
        return []
    }

    categoryArr =[];
    categories.forEach((category)=>{
        categoryVal={};

        categoryVal.name = category.Name;
        categoryVal.symbol = category.Symbol;
        categoryArr.push(categoryVal)
    });

    return categoryArr;
}

module.exports = toinstructorModel;