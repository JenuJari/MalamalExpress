const Sequelize = require('sequelize');

class DbConnection {
  constructor() {
    // console.log("Sqlite connection initiation started.");
    this.connection = new Sequelize({
      dialect: 'sqlite',
      storage: process.env.SQL_LITE_PATH
    });
  }

  getConnection = () => this.connection;

  testConn = async () => {
    try {
      await this.connection.authenticate();
      console.log('Connection has been established successfully.');
    } catch (err) {
      console.error('Unable to connect to the database:', err);
    }
  }
}

module.exports = new DbConnection;