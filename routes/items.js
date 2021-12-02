const express = require('express')
const itemsController = require('../controllers/items')
const router = express.Router()
const upload = require('../cloudinary')

router.get("/:idRestaurant", itemsController.getRestaurantItems);
router.post("/", upload.single('image'), itemsController.addItemToMenu);

module.exports = router;