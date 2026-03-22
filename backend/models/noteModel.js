const { Notes } = require("../schema");

// cari semua notes berdasarkan id_user
const findAll = async (userId) => {
  return await Notes.findAll({
    attributes: ["id_note", "judul", "isi", "id_user"],
    where: {
      id_user: userId
    }
  });
};

const create = async (noteData) => {
  return await Notes.create(noteData);
}

const findById = async (id_note) => {
  return await Notes.findByPk(id_note, {
    attributes: ["id_note", "judul", "isi","id_user"],
  });
}

// mengupdate note berdasarkan note id dan user id
const updateById = async (id_note, noteData, userId) => {
  return await Notes.update(noteData, {
    where: {
      id_note: id_note,
      id_user: userId
    }
  });
};

// menghapus note berdasarkan id note dan user id
const deleteById = async (id_note, userId) => {
  return await Notes.destroy({
    where: {
      id_note: id_note,
      id_user: userId
    }
  });
};

module.exports = {
  findAll,
  create,
  findById,
  updateById,
  deleteById,
};