'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('Recipes', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Recipes', 'userId');
  }
};
