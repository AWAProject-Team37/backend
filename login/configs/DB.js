require('dotenv').config()
const mysql = require('mysql')

let db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.NAME
})

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected to Database!")
})

module.exports = db