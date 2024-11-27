'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Recipes', 'UserId', 'userId');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Recipes', 'userId', 'UserId');
  }
};
