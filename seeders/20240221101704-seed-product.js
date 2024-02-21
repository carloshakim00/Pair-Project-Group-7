'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let data = require("../products.json")
    .map((perProduc)=>{
     perProduc.createdAt = perProduc.updatedAt = new Date();
     return perProduc;
    })
    await queryInterface.bulkInsert("Products", data,{})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Products", null, {
      truncate: true,
      restartIdentity: true
    })
  }
};
