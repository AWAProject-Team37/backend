const db = require('../database');



exports.putRestaurantOrderStatusById = (req, res) => {
    db.query(`SELECT FirstName,LastName,Name,Price from restaurant =${req.params.id}`, (error, result) => {
        if(error) console.log(error)
        return res.json(result);
    })
}
exports.getRestaurantUncompletedOrdersById = (req, res) => {
    db.query(`SELECT Name, Price FROM product_order JOIN order_item ON product_order.idOrder=order_item.idOrder JOIN item ON order_item.idItem=item.idItem  WHERE Status != 'Delivered' =${req.params.id}`, (error, result) => {
        if(error) console.log(error)
        return res.json(result);
    })
}
exports.getRestaurantCompletedOrdersById = (req, res) => {
    db.query(`SELECT FirstName, LastName, Date, Status,Name FROM restaurant JOIN product_order ON restaurant.idRestaurant=product_order.idRestaurant JOIN user ON product_order.idUser=user.idUser WHERE Status != 'Delivered' =${req.params.id}`, (error, result) => {
        if(error) console.log(error)
        return res.json(result);
    })
}
//Control orderiin, jossa vaihdetaan statusta
//SELECT FirstName, LastName, Date, Status FROM product_order JOIN user ON product_order.idUser=user.idUser JOIN order_item ON product_order.idOrder=order_item.idOrder  WHERE product_order.Status = "Delivered";
