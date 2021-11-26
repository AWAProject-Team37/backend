const express = require('express')
const itemsController = require('../controllers/items')
const router = express.Router()

router.get("/:idRestaurant", itemsController.getRestaurantItems);
router.post("/", itemsController.addItemToMenu);
module.exports = router;