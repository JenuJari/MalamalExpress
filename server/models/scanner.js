'use strict';
const { DataTypes, Model } = require('sequelize');
const DbConnection = require("./../db");

class Scanner extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
};

Scanner.init({
  scannerType: DataTypes.STRING,
  name: DataTypes.STRING,
  url: DataTypes.STRING
}, {
  sequelize: DbConnection.getConnection(),
  tableName: 'Scanner',
});


module.exports = Scanner;