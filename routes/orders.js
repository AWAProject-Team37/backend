const express = require('express')
const ordersController = require('../controllers/orders')
const router = express.Router()


router.put("/:id", ordersController.putRestaurantOrderStatusById);
router.get("/completed/:id", ordersController.getRestaurantCompletedOrdersById)
router.get("/uncompleted/:id", ordersController.getRestaurantUncompletedOrdersById)

module.exports = router;