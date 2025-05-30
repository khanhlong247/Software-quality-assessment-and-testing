const knex = require("knex");
const dotenv = require("dotenv");
dotenv.config();

const config = {
  development: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: {
        ca: process.env.DB_CA,
        rejectUnauthorized: false,
      },
    },
  },
};

const db = knex(config.development);

module.exports = db;
