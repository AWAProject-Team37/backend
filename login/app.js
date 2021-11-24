require('dotenv').config();
const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const connectFlash = require('connect-flash')
const { initRoutes } = require('./routes/routes')
const bodyParser = require('body-parser')
const { viewEngine } = require('./configs/viewEngine')
const passport = require('passport')

const app = express()

app.use(cookieParser('secret'))

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

viewEngine(app)

app.use(connectFlash())

app.use(passport.initialize())
app.use(passport.session())

initRoutes(app)

let port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}!`)
})