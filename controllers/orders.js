const db = require('../database');



exports.putRestaurantOrderStatusById = (req, res) => {
    db.query(`SELECT FirstName,LastName,Name,Price from restaurant =${req.params.id}`, (error, result) => {
        if(error) console.log(error)
        return res.json(result);
    })
}
exports.getRestaurantsUncompletedOrdersById = (req, res) => {
    db.query(`SELECT FirstName,LastName,Name,date,Price,idOrder from restaurant JOIN user ON restaurant =${req.params.id}`, (error, result) => {
        if(error) console.log(error)
        return res.json(result);
    })
}
exports.getRestaurantCompletedOrdersById = (req, res) => {
    db.query(`SELECT FirstName,LastName,Name,Price from restaurant =${req.params.id}`, (error, result) => {
        if(error) console.log(error)
        return res.json(result);
    })
}

exports.newOrder = (req, res) => {
    db.query(`INSERT into product_order values("${req.body.idOrder}", ${req.body.idUser}, "Received", "${req.body.date}", ${req.body.idRestaurant})`, (error, result) => {
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
