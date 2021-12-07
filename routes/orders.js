const express = require('express')
const ordersController = require('../controllers/orders')
const router = express.Router()


router.put("/:id", ordersController.putRestaurantOrderStatusById);
router.post("/new", ordersController.newOrder);
router.get("/completed/:id", ordersController.getRestaurantCompletedOrdersById)
router.get("/uncompleted/:id", ordersController.getRestaurantsUncompletedOrdersById)

module.exports = router;