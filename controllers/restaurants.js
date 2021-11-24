const mysql = require('mysql')

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

exports.getAllRestaurants = (req, res) => {
    db.query("SELECT * from restaurant", (error, result) => {
        if(error) console.log(error);
        return res.json(result);
    })
}