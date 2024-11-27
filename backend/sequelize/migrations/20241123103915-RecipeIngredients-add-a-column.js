'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('RecipeIngredients', 'quantity', {
      type: Sequelize.DataTypes.STRING, 
      allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('RecipeIngredients', 'quantity');
  }
};
