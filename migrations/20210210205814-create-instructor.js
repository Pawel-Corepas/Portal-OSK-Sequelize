'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Instructors', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Name: {
        type: Sequelize.STRING
      },
      Surname: {
        type: Sequelize.STRING
      },
      Email: {
        type: Sequelize.STRING
      },
    Mobile: {
        type: Sequelize.STRING
      },
      LicenceId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      GSheetRef:{
        type: Sequelize.STRING,
        unique: true
      },
      CreatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      UpdatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Instructors');
  }
};