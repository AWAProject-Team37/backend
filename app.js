const mysql = require('mysql')
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')
const dotenv = require('dotenv')
const cors = require('cors')
//dotenv.config({ path: './env' })
dotenv.config();

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

db.connect((error) => {
    if(error) {
        console.log(error)
    } else {
        console.log('MySQL Connected')
    }
})

const app = express()
app.use(cors());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.set('view engine', 'hbs')

app.use('/', require('./routes/pages'))
app.use('/auth', require('./routes/auth'))
app.use('/restaurants', require('./routes/restaurants'))
// app.post('/auth', (req,res) => {
//     const email = req.body.email
//     const password = req.body.password
//     if (email && password) {
//         db.query('SELECT * FROM user WHERE email = ? AND password = ?', [email, password], (error, result, fields) => {
//             if (result.length > 0) {
//                 req.session.loggedin = true
//                 req.session.email = email
//                 res.redirect('/index')
//             } else {
//                 res.send('INCORRECT Email or Password!')
//             }
//             res.end()
//         })
//     } else {
//         res.send('Please enter Email and Password!')
//         res.end()
//     }
// })

app.get('/home', (req, res) => {
    if (req.session.loggedin) {
        res.send('Welcome back!')
    } else {
        res.send('Please login!')
    }
    res.end()
})

app.listen(4000, () => {
    console.log("Server running on port 4000")
})