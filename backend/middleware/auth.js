const jwt = require("jsonwebtoken");
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).send("You Have to login!");
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).send("Unvalid token");
  }
};

module.exports = auth;