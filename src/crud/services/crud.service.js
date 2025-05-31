const { Op } = require("sequelize");
const crudModel = require("../model/crud.model");

const getAll = async () => {
  try {
    const data = await crudModel.findAll();
    return data;
  } catch (error) {
    throw error;
  }
};

const getById = async (id) => {
  try {
    const data = await crudModel.findByPk(id);
    if (!data) throw new Error("Data not found");
    return data;
  } catch (error) {
    throw error;
  }
};

const createData = async (judul, penulis, penerbit, email) => {
  try {
    const newData = await crudModel.create({
      judul: judul,
      penulis: penulis,
      penerbit: penerbit,
      email: email,
    });
    return newData;
  } catch (error) {
    throw error;
  }
};

const updateData = async (id, judul, penulis, penerbit, email) => {
  try {
    const getData = await crudModel.findByPk(id);
    if (!getData) throw new Error("Data not found");

    judul = judul !== undefined ? judul : getData.judul;
    penulis = penulis !== undefined ? penulis : getData.penulis;
    penerbit = penerbit !== undefined ? penerbit : getData.penerbit;
    email = email !== undefined ? email : getData.email;
    await crudModel.update(
      {
        judul: judul,
        penulis: penulis,
        penerbit: penerbit,
        email: email,
      },
      {
        where: {
          id: id,
        },
      }
    );
    const editData = await crudModel.findByPk(id);
    if (!editData) throw new Error("Data not found after update");
    return editData;
  } catch (error) {
    throw error;
  }
};

const deleteData = async (id) => {
  try {
    const data = await crudModel.findByPk(id);
    if (!data) throw new Error("Data not found");
    await crudModel.destroy({
      where: { id: id },
    });
    const deleted = await crudModel.findByPk(id, { paranoid: false });
    if (!deleted) throw new Error("Data not found or already deleted");
    return deleted;
  } catch (error) {
    throw error;
  }
};

const recoveryData = async (id) => {
  try {
    const deletedData = await crudModel.findByPk(id, { paranoid: false });
    if (!deletedData) throw new Error("Data not found");
    if (!deletedData.deletedAt) throw new Error("Data is not deleted");
    await crudModel.restore({ where: { id } });
    const recover = await crudModel.findByPk(id);
    if (!recover) throw new Error("Data not found after recovery");
    return recover;
  } catch (error) {
    throw error;
  }
};

const getRecovery = async () => {
  try {
    const data = await crudModel.findAll({
      paranoid: false,
      where: {
        deletedAt: {
          [Op.not]: null,
        },
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAll,
  getById,
  createData,
  updateData,
  deleteData,
  recoveryData,
  getRecovery,
};
