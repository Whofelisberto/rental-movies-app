const express = require('express');
const { authenticateToken } = require('../middlewares/authMiddlewares')
const { isAdmin } = require('../middlewares/isAdmin')
const router = express.Router();

const { criarMovie, listMovie , getMovieByID , updateMovie , deleteMovie } = require('../controllers/moviecontrollers');

router.get('/todos/movie', authenticateToken, listMovie);
router.get('/movie/:id', authenticateToken, isAdmin, getMovieByID);

router.post('/criar/movie',authenticateToken, isAdmin, criarMovie);
router.put('/movie/update/:id',authenticateToken, isAdmin, updateMovie);
router.delete('/movie/:id',authenticateToken, isAdmin, deleteMovie);

module.exports = router;
