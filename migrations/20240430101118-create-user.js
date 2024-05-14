'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER // PostgreSQL: 'SERIAL'
      },
      username: {
        type: Sequelize.STRING // PostgreSQL: 'VARCHAR(255)'
      },
      email: {
        type: Sequelize.STRING // PostgreSQL: 'VARCHAR(255)'
      },
      password: {
        type: Sequelize.STRING // PostgreSQL: 'VARCHAR(255)'
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
    await queryInterface.dropTable('Users');
  }
};
