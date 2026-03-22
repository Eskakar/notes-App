const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");
const auth = require("../middleware/auth");

// GET semua notes user
router.get("/",auth,noteController.getAllNotes);

// GET note berdasarkan id
router.get("/:id",auth,noteController.getNoteById);

// CREATE note
router.post("/", auth,noteController.createNote);

// UPDATE note
router.put("/:id", auth,noteController.updateNote);

// DELETE note
router.delete("/:id", auth,noteController.deleteNote);

module.exports = router;