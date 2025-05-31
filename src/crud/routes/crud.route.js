const express = require("express");
const {
  dataBuku,
  bukuById,
  addBuku,
  updateBuku,
  recoveryBuku,
  deleteBuku,
  getRecoveryBuku,
  uploadFile,
} = require("../controller/crud.controller");
const { body } = require("express-validator");
const routes = express.Router();


routes.post("/u/upload", uploadFile)

// method GET
routes.get("/recover", getRecoveryBuku);
routes.get("/crud/", dataBuku);
routes.get("/crud/:id", bukuById);


//method POST
routes.post(
  "/crud",
  [
    body("judul").notEmpty().withMessage("Judul is required"),
    body("penulis").notEmpty().withMessage("penulis is required"),
    body("penerbit").notEmpty().withMessage("penerbit is required"),
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .bail()
      .isEmail()
      .withMessage("format email salah"),
  ],
  addBuku
);

// method PUT/PATCH
routes.put("/crud/:id", updateBuku);
routes.patch("/crud/:id", recoveryBuku); //restore buku yand di delete

// method DELETE
routes.delete("crud/:id", deleteBuku);

module.exports = routes;
