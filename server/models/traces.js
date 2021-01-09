'use strict';
const { DataTypes, Model } = require('sequelize');
const DbConnection = require("./../db");

class Traces extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
};

Traces.init({
  scannerId: DataTypes.INTEGER,
  symbol: DataTypes.STRING,
  name: DataTypes.STRING,
  scannedAt:DataTypes.STRING,
  percentChange: DataTypes.REAL,
  ltp: DataTypes.REAL,
  volume: DataTypes.BIGINT,
}, {
  sequelize: DbConnection.getConnection(),
    tableName: 'Traces',
});

module.exports = Traces;