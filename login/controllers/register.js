const registerService = require('../services/register')
const { expressValidator } = require('express-validator')

let getResgiterPage = (req, res) => {
    return res.render('regiser.hbs', {
        errors: req.flash("errors")
    })
}

let register = async (req, res) => {
    let errorArr = []
    let validationErr = expressValidator(req)
    if (!validationErr.isEmpty()) {
        let errors = Object.values(validationErr.mapped())
        errors.forEach((item) => {
            errorArr.push(item.msg)
        })
        req.flash("errors", errorArr)
        return res.redirect('/register')
    }

    let newUser = {
        fname: req.body.firstName,
        lname: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }

    try {
        await registerService.register(newUser)
        return res.redirect('/login')
    } catch (err) {
        req.flash("errors", err)
        return res.redirect('/register')
    }
}

module.exports = {
    getResgiterPage: getResgiterPage,
    register: register
}