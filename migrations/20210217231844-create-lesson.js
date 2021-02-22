'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Lessons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      GSheetRef: {
        type: Sequelize.STRING
      },
      LessonDate: {
        type: Sequelize.DATE
      },
      StartTime: {
        type: Sequelize.STRING
      },
      Duration: {
        type: Sequelize.INTEGER
      },
      AdditinalInfo: {
        type: Sequelize.STRING
      },
      MigrationInfo: {
        type: Sequelize.STRING
      },
      InstructorId:{
        type:Sequelize.INTEGER,
        references:{
          model:'Instructors',
          key:'Id'
        },
        onDelete: 'CASCADE'
      },
      CourseId:{
        type:Sequelize.INTEGER,
        references:{
          model:'Courses',
          key:'Id'
        },
        onDelete: 'CASCADE'
      },
      StudentId:{
        type:Sequelize.INTEGER,
        references:{
          model:'Students',
          key:'Id'
        },
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('Lessons');
  }
};