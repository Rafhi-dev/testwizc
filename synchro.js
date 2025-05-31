const express = require("express");
const crudModel = require("./src/crud/model/crud.model");
const sequelize = require("./src/config/database");
const app = express();
const port = 7000;

// WARNIGN BECAREFUL IF YOU WANT TO USE SYNCHRO

app.listen(port, async () => {
  try {
    console.log("Proses Migrasi..");
    await sequelize.sync({ force: false });
    console.log("migrasi selesai..");
    process.exit();
  } catch (error) {
    console.log(error.message);
  }
});
