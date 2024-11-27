'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('Ingredients', [
      {
        name: 'яйцо'
      },
      {
        name: 'молоко'
      },
      {
        name: 'масло сливочное'
      },
      {
        name: 'масло подсолнечное'
      },
      {
        name: 'мука'
      },
      {
        name: 'какао-порошок'
      },
      {
        name: 'творог'
      },
      {
        name: 'манная крупа'
      },
      {
        name: 'овсяные хлопья'
      },
      {
        name: 'рис'
      },
      {
        name: 'вода'
      },
    ]);
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('Ingredients', null);
  }
};
