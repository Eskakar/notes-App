// Import Package dan File
const express = require("express");
const sequelize = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");

// Inisialisasi Express dan Cors
const app = express();
const cors = require("cors");

// Cara 1. Izinkan Semua Origin (tidak disarankan untuk produksi)
app.use(cors());

// Middleware untuk parsing JSON
app.use(express.json());

// Route dasar untuk testing
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Setting Routes
require("./schema"); // Untuk generate Tabel Users
app.use("/api/v1/users", userRoutes); // Untuk setting routes user
app.use("/api/v1/notes", noteRoutes); // Untuk setting routes note

// Sync Database dan Jalankan Server
const port = process.env.PORT || 3000;
sequelize.sync().then(() => {
  console.log("Database synced");
  app.listen(port, () => console.log(`Server running on port ${port}`));
});
