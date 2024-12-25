'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.addColumn('Recipes', 'ingredients', {
      type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING), 
      allowNull: false
    });     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Recipes', 'ingredients');
  }
};