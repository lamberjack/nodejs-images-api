const dotenv = require('dotenv');
dotenv.config();
const env = process.env.NODE_ENV; 

// dev configuration environment
const dev = {
  app: {
    PORT: "8080",
    HOST: "0.0.0.0",
  },
  db: {
    HOST: "localhost",
    PORT: "33060",
    USER: "maria",
    PASSWORD: "password",
    DB_NAME: "img_database",
    DIALECT: "mariadb",
  },
};

// test configuration environment
const test = {
  app: {
    PORT: "8081",
    HOST: "0.0.0.0",
  },
  db: {
    HOST: "localhost",
    PORT: "33061",
    USER: "maria",
    PASSWORD: "password",
    DB_NAME: "img_database",
    DIALECT: "mariadb",
  },
};

const config = {
  dev,
  test,
};

module.exports = 
  config[env]