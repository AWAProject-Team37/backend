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
    db.query(`SELECT FirstName, LastName, item.name, Price, Quantity, Date FROM order_item JOIN item ON order_item.idItem=item.idItem JOIN product_order ON order_item.idOrder=product_order.idOrder JOIN user ON product_order.idUser=user.idUser WHERE Status = 'Delivered'; =${req.params.id}`, (error, result) => {
        if(error) console.log(error)
        return res.json(result);
    })
}
//Control orderiin, jossa vaihdetaan statusta
//SELECT FirstName, LastName, Date, Status FROM product_order JOIN user ON product_order.idUser=user.idUser JOIN order_item ON product_order.idOrder=order_item.idOrder  WHERE product_order.Status = "Delivered";


exports.newOrder = (req, res) => {
    console.log(req.body)
    db.query(`INSERT into product_order values("${req.body.idOrder}", ${req.body.idUser}, "Received", "${req.body.date}", ${req.body.idRestaurant}, "${req.body.address}")`, (error, result) => {
        if(error){
            res.status(400).send({msg: "error"});
            console.log(error);
        }
    })
    req.body.items.forEach(element => {
        db.query(`INSERT into order_item values("${req.body.idOrder}", ${element.id}, ${element.quantity})`, (error, result) => {
            if(error){
                res.status(400).send({msg: "error"})
                console.log(error);
            }
        })
    });
    res.send("Order received")
}

