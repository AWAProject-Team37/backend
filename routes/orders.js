const express = require('express')
const ordersController = require('../controllers/orders')
const router = express.Router()



router.post("/new", ordersController.newOrder);
router.get("/completed/:id", ordersController.getRestaurantCompletedOrdersById);
router.get("/completeditems/:id", ordersController.getRestaurantCompletedItemsById);
router.get("/uncompleted/:id", ordersController.getRestaurantsUncompletedOrdersById);
router.put("/status/:id", ordersController.changeOrderStatus);

module.exports = router;