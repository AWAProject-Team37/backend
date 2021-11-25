const express = require('express')
const restaurantsController = require('../controllers/restaurants')
const router = express.Router()

router.get("/", restaurantsController.getAllRestaurants);
router.get("/:id", restaurantsController.getRestaurantById);
router.post("/", restaurantsController.addRestaurant);
module.exports = router;