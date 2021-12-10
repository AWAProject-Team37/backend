const express = require('express')
const ordersController = require('../controllers/orders')
const router = express.Router()



router.post("/new", ordersController.newOrder);

router.get("/completed/:id", ordersController.getRestaurantCompletedOrdersById);
router.get("/uncompleted/:id", ordersController.getRestaurantsUncompletedOrdersById);
router.put("/status", ordersController.changeOrderStatus);
router.get("/customer/:id", ordersController.getOrdersByCustomerId)
router.get("/items/:id", ordersController.getOrderItems);


module.exports = router;