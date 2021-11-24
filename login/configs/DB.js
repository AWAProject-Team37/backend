require('dotenv').config()
const mysql = require('mysql')

// const db = mysql.createConnection({
//     host: process.env.HOST,
//     user: process.env.USERNAME,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE
// })

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "FoodDelivery"
})

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected to Database!")
})

module.exports = db