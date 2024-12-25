'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.dropTable('CookTips');
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.createTable('CookTips');
    
  }
};
