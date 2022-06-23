
const config = require("../config/config")
const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.db.DB_NAME, config.db.USER, config.db.PASSWORD, {
  host: config.db.HOST,
  port: config.db.PORT,
  dialect: config.db.DIALECT,
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.images = require("./image.model")(sequelize, Sequelize);
module.exports = db;