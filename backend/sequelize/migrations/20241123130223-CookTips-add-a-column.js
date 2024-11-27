'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('CookTips', 'title', {
      type: Sequelize.DataTypes.STRING, 
      allowNull: false
    });
  },

  async down (queryInterface) {
    await queryInterface.removeColumn('CookTips', 'title');
  }
};
