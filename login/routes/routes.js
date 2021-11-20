const express = require('express')
const passport = require('passport')
const home = require('../controllers/home')
const login = require('../controllers/login')
const register = require('../controllers/register')
const initPassportLocal = require('../controllers/passportLocal')
const auth = require('../validation/authValidation')

initPassportLocal()

let router = express.Router()

let initRoutes = (app) => {
    router.get('/', login.checkLogin, home.home)
    router.get('/login', login.checkLogout, login.getLoginPage)
    router.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        successFlash: true,
        failureFlash: true
    }))
    router.get('/register', register.getResgiterPage)
    router.post('/register', auth.validateRegister, register.register)
    router.post('/logout', login.postLogout)
    return app.use('/', router)
}

module.exports = initRoutes
