'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Scanner', [{
      scannerType: 'chartink',
      name: "Malamal weekly smallcap",
      url:"https://chartink.com/screener/rocket-stocks-7",
      createdAt:new Date(),
      updatedAt:new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Scanner', null, {});
  }
};
