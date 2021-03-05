'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Instructor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Instructor.hasMany(models.Category,{
      foreignKey:'InstructorId'
    }),
      Instructor.belongsTo(models.Lesson,{foreignKey:'id', target_key:'InstructorId'})
    }
  };
  Instructor.init({
    Name: DataTypes.STRING,
    Surname: DataTypes.STRING,
    Email: DataTypes.STRING,
    Mobile: DataTypes.STRING,
    LicenceId: DataTypes.STRING,
    GSheetRef: DataTypes.STRING
  },
   {
    sequelize,
    modelName: 'Instructor',
  });


  return Instructor;
};