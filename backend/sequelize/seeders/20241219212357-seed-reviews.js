'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('Reviews', [{
       userId: 6, 
       rate: 3,
       content: "lfdkgdfhs"
     }], {});
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Reviews', null, {});
     
  }
};
