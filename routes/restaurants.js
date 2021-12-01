const express = require('express')
const dotenv = require('dotenv')
dotenv.config();
const restaurantsController = require('../controllers/restaurants')
const router = express.Router()
const upload = require('../cloudinary')

router.get("/", restaurantsController.getAllRestaurants);
router.get("/:id", restaurantsController.getRestaurantById);
router.post("/", upload.single('image'), restaurantsController.addRestaurant);

module.exports = router;