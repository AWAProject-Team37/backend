const { expressValidator } = require('express-validator')
const loginService = require('../services/login')

let getLoginPage = (req, res) => {
    return res.render('/login', {
        error: req.flash("errors")
    })
}

let login = async (req, res) => {
    let errorArr = []
    let validationErr = expressValidator(req)
    if (!validationErr.isEmpty()) {
        let errors = Object.values(validationErr.mapped())
        errors.forEach((item) => {
            errorArr.push(item.msg)
        })
        req.flash("errors", errorArr)
        return res.redirect('/login')
    }

    try {
        await loginService.handleLogin(req.body.email, req.body.password)
        return res.redirect('/')
    } catch (err) {
        req.flash("errors", err)
        return res.redirect('login')
    }
}

let checkLogin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login')
    }
    next()
}

let checkLogout = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    next();
}

let postLogout = (req, res) => {
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