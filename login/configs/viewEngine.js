const express = require('express')

const viewEngine = (app) => {
    app.use(express.static('../public'))
    app.set('view engine', 'hbs')
    app.set('views', '../views')
}

module.exports = { viewEngine: viewEngine }