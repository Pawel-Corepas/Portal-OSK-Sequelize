'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Lesson.hasOne(models.Student,{
        foreignKey:'id'
      }),
      Lesson.hasOne(models.Instructor,{
        foreignKey:'id'
      }),
      Lesson.hasOne(models.Course,{
        foreignKey:'id'
      })
    }
  };
  Lesson.init({
    GSheetRef: DataTypes.STRING,
    LessonDate: DataTypes.DATE,
    StartTime: DataTypes.STRING,
    Duration: DataTypes.INTEGER,
    AdditinalInfo: DataTypes.STRING,
    MigrationInfo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Lesson',
  });
  return Lesson;
};