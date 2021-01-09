'use strict';
const { DataTypes, Model } = require('sequelize');
const DbConnection = require("./../db");

class User extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
};

User.init({
  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  type: DataTypes.STRING
}, {
  sequelize : DbConnection.getConnection(),
  modelName: 'User',
});

User.prototype.toJSON = function () {
  var values = Object.assign({}, this.get());

  delete values.password;
  return values;
}

module.exports = User;