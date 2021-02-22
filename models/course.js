'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Course.belongsTo(models.Lesson,{foreignKey:'Id', target_key:'CourseId'})
    }
  };
  Course.init({
    GSheetRef: DataTypes.STRING,
    Name: DataTypes.STRING,
    Price: DataTypes.INTEGER,
    Category: DataTypes.ENUM('A','A1','A2','AM','B1','B','C','CE','D','DE','T'),
    HoursOfPractice: DataTypes.INTEGER,
    StartDate: DataTypes.DATE,
    EndDate: DataTypes.DATE,
    AdditinalInfo: DataTypes.STRING,
    Status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Course',
    indexes: [
      // Create a unique index on email
      {
        unique: true,
        fields: ['StartDate','Category']
      }]
  });
  return Course;
};