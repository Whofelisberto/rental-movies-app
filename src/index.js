require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("../routes/auth");
const movieRoutes = require("../routes/movies");
const rentalRoutes = require("../routes/rentals");

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/rentals', rentalRoutes);

app.get('/', (_req, res) => {
  res.json({ message: "API de Rental Movies está rodando!!!" });
});

app.listen(PORT, () => {
  console.log(`Server rodando ${PORT}`);
});

module.exports = app;
