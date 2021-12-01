if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

const mysql = require('mysql')

const database = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

database.connect(function(error) {
    if (error) throw error;
    console.log("Database connected!")
})

module.exports = database