const db = require('../database');

exports.getAllRestaurants = (req, res) => {
    db.query("SELECT * from restaurant", (error, result) => {
        if(error) console.log(error);
        return res.json(result);
    })
}

exports.getRestaurantById = (req, res) => {
    db.query(`SELECT * from restaurant WHERE idRestaurant=${req.params.id}`, (error, result) => {
        if(error) console.log(error)
        return res.json(result);
    })
}

exports.addRestaurant = (req, res) => {
    if(req.body.name == "" || req.body.Address == "" || req.body.time == "" || req.body.type == "" || req.body.price == "" || req.body.image == "") res.send("Some fields are empty")
    db.query(`INSERT into restaurant VALUES(null, "${req.body.name}","${req.body.Address}","${req.body.time}","${req.body.type}","${req.body.price}","${req.body.image}",1)`, (error, result) => {
        if(error) console.log(error)
        return res.send("Restaurant added");
    })
}