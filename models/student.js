'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Student.belongsTo(models.Lesson,{foreignKey:'Id', target_key:'StudentId'})
    }
  };
  Student.init({
    GSheetRef: DataTypes.STRING,
    Email: DataTypes.STRING,
    Name: DataTypes.STRING,
    Surname: DataTypes.STRING,
    Pesel: DataTypes.STRING,
    Mobile: DataTypes.STRING,
    AdditinalInfo: DataTypes.STRING,
    Status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};