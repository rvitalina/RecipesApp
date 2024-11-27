'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Recipes', 'userId');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('Recipes', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  }
};
