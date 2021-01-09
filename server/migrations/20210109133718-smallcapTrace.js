'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Scanner', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      scannerType: {
        allowNull: false,
        type: Sequelize.ENUM('chartink', 'screener_in')
      },
      name:{
        type: Sequelize.STRING
      },
      url:{
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.createTable('Traces', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      scannedAt:{
        allowNull: false,
        type: Sequelize.STRING
      },
      scannerId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      symbol:{
        type: Sequelize.STRING
      },
      name:{
        type: Sequelize.STRING
      },
      percentChange:{
        type: Sequelize.DOUBLE
      },
      ltp:{
        type: Sequelize.DOUBLE
      },
      volume:{
        type: Sequelize.BIGINT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Scanner');
    await queryInterface.dropTable('Traces');
  }
};
