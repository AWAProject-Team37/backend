const mysql = require('mysql')
const bcrypt = require('bcryptjs')

const db = mysql.createConnection({
    host: process.env.HOST,
    user: 'root',
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

exports.register = (req, res) => {
   
    const { fname, lname, email, password, cpassword } = req.body

    db.query('SELECT email FROM user WHERE email = ?', [email], async (error, result) => {
        if(error) {
            console.log(error)
        }

        if(result.length > 0) {
            return res.render('register', {
                message: 'That email is already used!'
            })
        } else if(password !== cpassword) {
            return res.render('register', {
                message: 'Passwords do not match!'
            })
        }

        let hashedPassword = await bcrypt.hash(password, 8)

        db.query('INSERT INTO user SET ?', {
            firstName: fname,
            lastName: lname,
            email: email,
            password: hashedPassword
        }, (error, result) => {
            if(error) {
                console.log(error)
            } else {
                console.log(result)
                return res.render('register', {
                    message: 'User registered'
                })
            }
        })
    })
}

exports.login = (req, res) => {
    const { email, password } = req.body
    if (email && password) {
        db.query('SELECT * FROM user WHERE email = ? AND password = ?', async (error, result) => {
            if (result.length > 0) {
                req.session.loggedin = true
                req.session.email = email
                req.redirect('/index')
            } else {
                res.send('INCORRECT Email or Password!')
            }
            res.end()
        })
    } else {
        res.send('Please enter Email and Password')
        res.end()
    }
}