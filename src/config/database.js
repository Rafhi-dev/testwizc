const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT, 
    logging: false, // matikan logging query SQL
    pool: {
      max: 5, // jumlah maksimum koneksi dalam pool
      min: 0, // jumlah minimum koneksi dalam pool
      acquire: 30000, // waktu maksimum untuk mendapatkan koneksi (ms)
      idle: 10000, // waktu maksimum koneksi idle sebelum dilepas (ms)
    }
  }
);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
}

testConnection();

module.exports = sequelize;
