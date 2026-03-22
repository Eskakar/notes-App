const User = require("./user");
const Notes = require("./note");

/* RELASI */
//nama user akan menjadi foreign key ke note
User.hasMany(Notes, {
  foreignKey: "id_user"
});

Notes.belongsTo(User, {
  foreignKey: "id_user"
});

module.exports = {
  User,
  Notes
};