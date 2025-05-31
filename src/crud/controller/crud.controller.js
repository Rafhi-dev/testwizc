const { validationResult } = require("express-validator");
const {
  getAll,
  getById,
  createData,
  updateData,
  deleteData,
  recoveryData,
  getRecovery,
} = require("../services/crud.service");

const upload = require("../services/upload.service");




const dataBuku = async (req, res) => {
  try {
    const buku = await getAll();
    res.status(200).json({
      success: true,
      result: buku,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const bukuById = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      error: "ID harus berupa angka",
    });
  }
  try {
    const bukuId = await getById(id);
    res.status(200).json({
      success: true,
      result: bukuId,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
const addBuku = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({
      success: false,
      error: errors.array().map((err) => err.msg),
    });
  const { judul, penulis, penerbit, email } = req.body;
  try {
    const inputBuku = await createData(judul, penulis, penerbit, email);
    res.status(201).json({
      success: true,
      result: inputBuku,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const updateBuku = async (req, res) => {
  const id = parseInt(req.params.id);
  const { judul, penulis, penerbit, email } = req.body;
  try {
    const editBuku = await updateData(id, judul, penulis, penerbit, email);
    res.status(200).json({
      success: true,
      result: editBuku,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const deleteBuku = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deleteId = await deleteData(id);
    res.status(200).json({
      success: true,
      result: deleteId,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const recoveryBuku = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const dataId = await recoveryData(id);
    res.status(200).json({
      success: true,
      result: dataId,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const getRecoveryBuku = async (req, res) => {
  try {
    const grData = await getRecovery();
    res.status(200).json({
      success: true,
      result: grData, // konsisten gunakan 'result'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

//upload file
const uploadFile = async (req, res) => {
  try {
    upload.array("files")(req, res, (err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          error: err.message,
        });
      }
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          error: "File tidak ditemukan",
        });
      }
      res.status(200).json({
        success: true,
        message: "File berhasil diupload",
        files: req.files,
      });
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  dataBuku,
  bukuById,
  addBuku,
  updateBuku,
  deleteBuku,
  recoveryBuku,
  getRecoveryBuku,
  uploadFile
};