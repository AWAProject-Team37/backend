const db = require('../database');

exports.getRestaurantItems = (req, res) => {
    db.query(`select * from Item where idRestaurant=${req.params.idRestaurant}`, (error, result) => {
        if(error) console.log(error)
        res.json(result);
    })
    
}

exports.addItemToMenu = (req, res) => {
    console.log(req.body);
    res.send("moro");
}