'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Очищаем таблицу Recipes
    await queryInterface.bulkDelete('Recipes', null, {});
  },

  async down (queryInterface, Sequelize) {
    // Вставляем пример данных для отката миграции
    await queryInterface.bulkInsert('Recipes', [{
      name: 'John Doe',
      isBetaMember: false
    }], {});
  }
};