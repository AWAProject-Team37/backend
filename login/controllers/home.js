const home = async (req, res) => {
    return res.render('index', {
        user: req.user
    })
}

module.exports = { home: home }