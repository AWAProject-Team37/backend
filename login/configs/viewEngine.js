const express = require('express')

let viewEngine = (app) => {
    app.use(express.static('../public'))
    app.set('view engine', 'hbs')
    app.set('views', '../views')
}

module.exports = viewEngine