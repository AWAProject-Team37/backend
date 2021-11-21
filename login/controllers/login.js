const { expressValidator } = require('express-validator')
const loginService = require('../services/login')

let getLoginPage = (req, res) => {
    return res.render('/login', {
        error: req.flash("errors")
    })
}

const login = async (req, res) => {
    const errorArr = []
    const validationErr = expressValidator(req)
    if (!validationErr.isEmpty()) {
        const errors = Object.values(validationErr.mapped())
        errors.forEach((item) => {
            errorArr.push(item.msg)
        })
        req.flash("errors", errorArr)
        return res.redirect('/login')
    }

    try {
        await loginService.login(req.body.email, req.body.password)
        return res.redirect('/')
    } catch (err) {
        req.flash("errors", err)
        return res.redirect('login')
    }
}

const checkLogin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login')
    }
    next()
}

const checkLogout = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    next();
}

const postLogout = (req, res) => {
    req.session.destroy(function(err) {
        return res.redirect('/login')
    })
}

module.exports = {
    getLoginPage: getLoginPage,
    login: login,
    checkLogin: checkLogin,
    checkLogout: checkLogout,
    postLogout: postLogout
}