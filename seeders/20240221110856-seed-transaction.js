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
    let data = require("../transactions.json")
    .map((perTrans)=>{
     perTrans.createdAt = perTrans.updatedAt = new Date();
     return perTrans;
    })
    await queryInterface.bulkInsert("Transactions", data,{})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Transactions", null, {
      truncate: true,
      restartIdentity: true
    })
  }
};
