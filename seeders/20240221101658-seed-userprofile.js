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
    let data = require("../userprofiles.json")
    .map((perUserProfile)=>{
     perUserProfile.createdAt = perUserProfile.updatedAt = new Date();
     return perUserProfile;
    })
    await queryInterface.bulkInsert("UserProfiles", data,{})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("UserProfiles", null, {
      truncate: true,
      restartIdentity: true,
      cascade: true
    })
  }
};
