const { User } = require("../schema"); //bisa karena sudah ada index.js di schema

//kemungkinan belum akan dipakai, buat testing saja
const findAll = async () => {
  return await User.findAll({
    attributes: ["id_user", "nama"],
  });
};

// buat register, harus hash password dulu
const create = async (userData) => {
  return await User.create(userData);
}

//kemungkinan belum akan dipakai, hanya admin
const findById = async (id_user) => {
  return await User.findByPk(id_user, {
    attributes: ["id_user", "nama"],
  });
}

//buat nyari nama (login, register)
const findByNama = async (nama) => {
  return await User.findOne({
    attributes: ["id_user", "nama" ,"password"],
    where: { nama: nama }
  });
}

// buat ganti pass user atau nama, ngaturnya di controller
const updateById = async (id_user, userData) => {
  return await User.update(userData, {
    where: {
      id_user: id_user,
    },
  });
}

//ngehapus user, buat admin / testing
const deleteById = async (id_user) => {
  return await User.destroy({
    where: {
      id_user: id_user,
    },
  });
}

module.exports = {
  findAll,
  create,
  updateById,
  deleteById,
  findById,
  findByNama
};
