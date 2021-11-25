const express = require('express')
const restaurantsController = require('../controllers/restaurants')
const router = express.Router()

router.get("/", restaurantsController.getAllRestaurants);
router.get("/:id", restaurantsController.getRestaurantById);

module.exports = router;