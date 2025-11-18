const prisma = require("../prisma/client");

async function criarMovie(req, res) {
  try {
    const { title, description, year, available } = req.body;

    if (!title || !description || !year) {
      return res.status(400).json({ message: "Todos os campos obrigatórios" });
    }

    const movie = await prisma.movie.create({
      data: {
        title,
        description,
        year,
        available: available !== undefined ? available : true,
      },
    });
    res.status(201).json(movie);
  } catch (error) {
    console.error("Erro ao criar movie:", error);
    res.status(500).json({ message: "Erro ao criar movie" });
  }
}

async function listMovie(_req, res) {
  try {
    const movies = await prisma.movie.findMany();
    res.status(200).json(movies);
  } catch (error) {
    console.error("Erro ao listar movies:", error);
    res.status(500).json({ message: "Erro ao listar movies" });
  }
}

async function getMovieByID(req, res) {
  try {
    const movieId = parseInt(req.params.id, 10);
    if (Number.isNaN(movieId)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const movie = await prisma.movie.findUnique({ where: { id: movieId } });
    if (!movie)
      return res.status(404).json({ message: "Movie não encontrado" });

    res.status(200).json(movie);
  } catch (error) {
    console.error("Erro ao buscar movie", error);
    res.status(500).json({ message: "Erro ao buscar movie por ID" });
  }
}

async function updateMovie(req, res) {
  try {
    const movieId = parseInt(req.params.id, 10);
    if (Number.isNaN(movieId)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const { title, description, year, available } = req.body;
    const movie = await prisma.movie.update({
      where: { id: movieId },
      data: {
        title,
        description,
        year,
        available,
      },
    });
    res.status(200).json(movie);
  } catch (error) {
    console.error("Erro ao atualizar movie:", error);
    res.status(500).json({ message: "Erro ao atualizar movie" });
  }
}

async function deleteMovie(req, res) {
  try {
    const movieId = parseInt(req.params.id, 10);
    if (Number.isNaN(movieId)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    await prisma.movie.delete({ where: { id: movieId } });
    res.status(204).json({ message: "Movie deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar movie:", error);
    res.status(500).json({ message: "Erro ao deletar movie" });
  }
}

module.exports = {
  criarMovie,
  listMovie,
  getMovieByID,
  updateMovie,
  deleteMovie,
};
