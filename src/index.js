const express = require("express");
const authRoutes = require("../routes/auth");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/", authRoutes);

app.get('/', (_req, res) => {
  res.json("API de Rental Movies está rodando!");
});

app.listen(PORT, () => {
  console.log(`Server rodando ${PORT}`);
});

module.exports = app;
