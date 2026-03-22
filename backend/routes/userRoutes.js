const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/Register",userController.createUser);
router.post("/Login",userController.loginUser);

module.exports = router;