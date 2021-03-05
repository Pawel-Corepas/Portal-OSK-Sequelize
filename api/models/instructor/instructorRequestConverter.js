function instructorRequestConverter(instructorRequest){
   
    instructor = {};
    instructor.Name = instructorRequest.name;
    instructor.Surname = instructorRequest.surname;
    instructor.Email = instructorRequest.email;
    instructor.Mobile = instructorRequest.mobile;
    instructor.LicenceId = instructorRequest.licenceId;

    instructor.Categories = buildCategories(instructorRequest.categories);
    
    
    console.log(instructor)
     
    return instructor

}

function buildCategories(caregories){
    categoryArr =[];
    caregories.forEach((category)=>{
        categoryVal={};

        categoryVal.Name = category.name;
        categoryVal.Symbol = category.symbol;
        categoryArr.push(categoryVal)
    });

    return categoryArr;
}

module.exports = instructorRequestConverter;