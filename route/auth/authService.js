const config = require("../../config/database")
const jwt = require("jsonwebtoken")
const expressJwt = require("express-jwt")
const compose = require("composable-middleware")
const user = require("../user/user.model")
const validateJwt = expressJwt({ secret: config.secretOrKey })

function isAuthenticated() {
    return (
        compose().use(function(req, res, next) {
            validateJwt(req, res, next)
            if (req.query)
        })
    )
}