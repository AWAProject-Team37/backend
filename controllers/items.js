const db = require('../database');

exports.getRestaurantItems = (req, res) => {
    db.query(`select * from Item where idRestaurant=${req.params.idRestaurant}`, (error, result) => {
        if(error) console.log(error)
        res.json(result);
    })
    
}

exports.addItemToMenu = (req, res) => {
    db.query(`insert into Item values(null, ${req.body.id}, "${req.body.name}", ${req.body.price}, "${req.body.category}", "${req.file.path}", "${req.body.desc}")`, (error, result) => {
        if(error){
            console.log(error);
            res.status(400).send({msg: "something went wrong"});
        } else {
            res.send("Item added")
        }
    }) 
}