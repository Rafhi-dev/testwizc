const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const crudModel = sequelize.define("crudModel",{
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
    },
    judul: {
        type: DataTypes.STRING,
        allowNull: false
    },
    penulis: {
        type: DataTypes.STRING,
        allowNull: false
    },
    penerbit: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: "buku",
    timestamps: true,
    paranoid: true
})

module.exports = crudModel