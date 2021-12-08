const db = require('../database');

exports.getAllRestaurants = (req, res) => {
    db.query("SELECT * from restaurant", (error, result) => {
        if(error) {
            console.log(error);
            res.status(400).send({msg: "error"});
        }
        return res.json(result);
    })
}

exports.getRestaurantById = (req, res) => {
    db.query(`SELECT * from restaurant WHERE idRestaurant=${req.params.id}`, (error, result) => {
        if(error) {
            console.log(error);
            res.status(400).send({msg: "error"});
        }
        return res.json(result);
    })
}

exports.addRestaurant = (req, res) => {
    db.query(`INSERT into restaurant VALUES(null, "${req.body.name}","${req.body.Address}","${req.body.time}","${req.body.type}","${req.body.price}","${req.file.path}",${req.body.id})`, (error, result) => {
        if(error) {
            console.log(error);
            return res.status(400).send({msg: "This account already has restaurant in database"})
        }
        return res.send("Restaurant added");
    })
}
exports.getRestaurantByUserId = (req, res) => {
    db.query(`SELECT * from restaurant WHERE idUser=${req.params.id}`, (error, result) => {
        if(error) {
            console.log(error);
            res.status(400).send({msg: "error"});
        }
        return res.json(result);
    })
}
