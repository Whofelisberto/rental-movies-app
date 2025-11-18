const express = require("express");
const { authenticateToken } = require('../middlewares/authMiddlewares')
const router = express.Router();

const { rentalMovie, returnRentalMovie, listUserRentals } = require("../controllers/rentalsControlers");

router.post('/rent/:movieId', authenticateToken, rentalMovie);
router.post('/return/:rentalId', authenticateToken, returnRentalMovie);
router.get('/my-rentals', authenticateToken, listUserRentals);

module.exports = router;
