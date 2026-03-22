const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
require('dotenv').config();
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET;

//testing
const getAllUsers = async (req, res) => {
  try {
    const allDataUser = await userModel.findAll();
    res.status(200).json({
      message: "Users retrieved successfully",
      data: allDataUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving users",
      error: error.message,
    });
  }
};

//register
const createUser = async (req, res) => {
  const { nama, password } = req.body;

  try {
    //cek apakah sudah ada yang memakai nama yang sama
    const userCheck = await userModel.findByNama(nama);
    if (userCheck) {
      return res.status(409).json({
        message: "Name already in use",
      });
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      nama,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created successfully",
      //data dari db jika butuh pengecekan
      data: {
        nama: newUser.nama
      },
    });

  } catch (error) {
    res.status(400).json({
      message: "Failed to create user",
      error: error.message,
    });
  }
};

//ganti sandi atau nama
const updateUser = async (req, res) => {
  const { id } = req.params; //kurang aman, harusnya pakai token
  const { nama, password } = req.body;

  try {

    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const updatedUser = await userModel.updateById(id, { nama, password });
    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating user",
      error: error.message,
    });
  }
};
//hanya admin boleh delete
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {

    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const deletedUser = await userModel.deleteById(id);
    res.status(200).json({
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting user",
      error: error.message,
    });
  }
};

//login
const loginUser = async (req,res)=> {
  const {nama, password} = req.body;
  try{
    // nyari nama dari username dulu
    const user = await userModel.findByNama(nama);
    if(!user){
      return res.status(404).json({
        message: "User not found",
      });
    }
    const userPass = await bcrypt.compare(password, user.password);
    if (!userPass) {
      return res.status(401).json({
        message: "Wrong Password"
      });
    }
    const token = jwt.sign(
      { id_user: user.id_user, nama: user.nama },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      message: "Login success",
      data: {
        id_user: user.id_user,
        nama: user.nama
      },
      token
    });
  }catch(err){
    throw err;
  }
}

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};
