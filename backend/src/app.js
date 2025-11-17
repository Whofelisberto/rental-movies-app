const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res ) => {
  res.send('API de Aluguel de Filmes funcionando!');
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server rodando na porta ${PORT}`);
});

module.exports = app;
