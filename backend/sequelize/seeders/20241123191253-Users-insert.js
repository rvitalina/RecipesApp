'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Users', [
      {
        firstName: "Василий",
        lastName: "Метелкин",
        email: "vasya015@gmail.com",
        password: "vasyliyvelikiy1986"
      }
    ]);
  },

  async down(queryInterface) {
    // Удаление вставленной записи при откате миграции
    await queryInterface.bulkDelete('Users', {
      email: "vasya015@gmail.com"
    }, {});
  }
};