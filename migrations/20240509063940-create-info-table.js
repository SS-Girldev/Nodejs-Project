'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create the Info table
    await queryInterface.createTable('Info', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id'
        },
      },
      name: {
        type: Sequelize.STRING // PostgreSQL: 'VARCHAR(255)'
      },
      address: {
        type: Sequelize.TEXT // PostgreSQL: 'TEXT'
      },
      contact: {
        type: Sequelize.STRING // PostgreSQL: 'VARCHAR(20)'
      },
      gender: {
        type: Sequelize.ENUM('male', 'female', 'other') // PostgreSQL: 'ENUM'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE // PostgreSQL: 'TIMESTAMP WITHOUT TIME ZONE'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE // PostgreSQL: 'TIMESTAMP WITHOUT TIME ZONE'
      }
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove foreign key constraint
    await queryInterface.removeConstraint('Info', 'FK_Info_UserId');
  
    // Drop the Info table
    await queryInterface.dropTable('Info');
  },

  async before(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('SELECT 1');
    await queryInterface.removeConstraint('YourTableName', 'FK_constraint_name'); // Remove constraint before running this migration
  },

  async after(queryInterface, Sequelize) {
    await queryInterface.addConstraint('YourTableName', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'FK_Info_UserId',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  }
};
