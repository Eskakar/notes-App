const noteModel = require("../models/noteModel"); 
require("dotenv").config();

// GET semua notes milik user
const getAllNotes = async (req, res) => {
  try {
    const userId = req.user.id_user;

    const notes = await noteModel.findAll(userId);

    res.json(notes);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// CREATE note
const createNote = async (req, res) => {
  try {
    const userId = req.user.id_user;
    const { judul, isi } = req.body;

    if (!judul || !isi) {
      return res.status(400).json({ message: "Data tidak lengkap" });
    }

    const newNote = await noteModel.create({
      judul,
      isi,
      id_user: userId
    });

    res.status(201).json({
      message: "Note berhasil dibuat",
      data: newNote
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


//  GET note by ID
const getNoteById = async (req, res) => {
  try {
    const userId = req.user.id_user;
    const { id } = req.params;

    const note = await noteModel.findById(id);

    if (!note || note.id_user !== userId) {
      return res.status(404).json({ message: "Note tidak ditemukan" });
    }

    res.json(note);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// UPDATE note
const updateNote = async (req, res) => {
  try {
    const userId = req.user.id_user;
    const { id } = req.params;
    const { judul, isi } = req.body;

    const updated = await noteModel.updateById(
      id,
      { judul, isi },
      userId
    );

    if (updated[0] === 0) {
      return res.status(404).json({ message: "Note tidak ditemukan / bukan milik user" });
    }

    res.json({ message: "Note berhasil diupdate" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// DELETE note
const deleteNote = async (req, res) => {
  try {
    const userId = req.user.id_user;
    const { id } = req.params;

    const deleted = await noteModel.deleteById(id, userId);

    if (!deleted) {
      return res.status(404).json({ message: "Note tidak ditemukan / bukan milik user" });
    }

    res.json({ message: "Note berhasil dihapus" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllNotes,
  createNote,
  updateNote,
  getNoteById,
  deleteNote,
};