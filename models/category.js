'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.belongsTo(models.Instructor,{foreignKey:'Id', target_key:'InstructorId'})
    }
  };
  Category.init({
    Symbol: DataTypes.ENUM('A','A1','A2','AM','B1','B','C','CE','D','DE','T'),
    Name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
 
  return Category;
};