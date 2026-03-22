const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Notes = sequelize.define("Notes", {
  id_note: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  judul: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  isi: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Notes;