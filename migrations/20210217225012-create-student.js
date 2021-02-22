'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      GSheetRef: {
        type: Sequelize.STRING
      },
      Email: {
        type: Sequelize.STRING
      },
      Name: {
        type: Sequelize.STRING
      },
      Surname: {
        type: Sequelize.STRING
      },
      Pesel: {
        type: Sequelize.STRING
      },
      Mobile: {
        type: Sequelize.STRING
      },
      AdditinalInfo: {
        type: Sequelize.STRING
      },
      Status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Students');
  }
};