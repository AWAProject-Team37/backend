const mysql = require('mysql')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "fooddeliveryapp"
})

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected to Database!")
})

module.exports = db