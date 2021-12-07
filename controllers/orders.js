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

