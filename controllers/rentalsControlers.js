const prisma = require("../prisma/client");

async function rentalMovie(req, res) {
  try {
    const userId = req.user.id;
    const movieId = parseInt(req.params.movieId, 10);
    if (Number.isNaN(movieId)) {
      return res.status(400).json({ error: "movieId inválido" });
    }


    const rental = await prisma.$transaction(async (tx) => {
      const update = await tx.movie.updateMany({
        where: { id: movieId, available: true },
        data: { available: false },
      });

      if (update.count === 0) {
        const exists = await tx.movie.findUnique({ where: { id: movieId } });
        if (!exists) {
          const err = new Error("Movie não encontrado");
          err.code = "NOT_FOUND";
          throw err;
        }
        const err = new Error("Movie Indisponível");
        err.code = "NOT_AVAILABLE";
        throw err;
      }

      return await tx.rental.create({ data: { userId, movieId } });
    });

    res.status(201).json(rental);
  } catch (error) {
    console.error("Erro em rentalMovie:", error);
    if (error.code === "NOT_FOUND")
      return res.status(404).json({ error: "Movie não encontrado" });
    if (error.code === "NOT_AVAILABLE")
      return res.status(400).json({ error: "Movie Indisponível" });
    res.status(500).json({ error: "Erro ao alugar Movie" });
  }
}

async function returnRentalMovie(req, res) {
  try {
    const userId = req.user.id;
    const rentalId = parseInt(req.params.rentalId, 10);
    if (Number.isNaN(rentalId))
      return res.status(400).json({ error: "rentalId inválido" });

    const rental = await prisma.rental.findUnique({
      where: { id: rentalId },
      include: { movie: true },
    });
    if (!rental)
      return res.status(404).json({ error: "Aluguel não encontrado" });
    if (rental.userId !== userId)
      return res.status(403).json({ error: "Não autorizado" });
    if (rental.returnedAt)
      return res.status(400).json({ error: "Filme já devolvido" });

    const updated = await prisma.rental.update({
      where: { id: rentalId },
      data: { returnedAt: new Date() },
    });

    await prisma.movie.update({
      where: { id: rental.movieId },
      data: { available: true },
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao devolver filme" });
  }
}

async function listUserRentals(req, res) {
  try {
    const userId = req.user.id;
    const rentals = await prisma.rental.findMany({
      where: { userId },
      include: { movie: true },
      orderBy: { rentedAt: "desc" },
    });
    res.json(rentals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao listar aluguéis" });
  }
}

module.exports = { rentalMovie, returnRentalMovie, listUserRentals };
