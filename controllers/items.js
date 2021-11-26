const mysql = require('mysql')

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

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