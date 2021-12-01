if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

const bcrypt = require('bcrypt')
const database = require('./config/database')
const express = require('express')
const flash = require('express-flash')
const passport = require('passport')
const session = require('express-session')

const app = express()


// PASSPORT
const initializePassport = require('./config/passport')
initializePassport(
	passport,
	email => users.find(user => user.email === email),
	id => users.find(user => user.di === id)
)


// CONFIG
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(flash())
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize())
app.use(session())


// RENDER PAGES
app.get('/', (req, res) => {
	res.render('index.ejs', { group : 'AWA-Project-37' })
})

app.get('/login', (req, res) => {
	res.render('login.ejs')
})

app.get('/register', (req, res) => {
	res.render('register.ejs')
})


// LOGIN
app.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true
}))


// REGISTER
app.post('/register', async (req, res) => {
	try {
		const { firstName, lastName, email, password, passwordConfirm } = req.body

		// Valid email check
		database.query('SELECT email FROM user WHERE email = ?', [email], (error, result) => {
			if (error) {
				console.log(error)
			}
			if (result.length > 0) {
				return
			} else if (password !== passwordConfirm) { // Password match check
				return
			}
		})

		// Insert user into database
		const hashedPassword = await bcrypt.hased(password, 10)
		database.query('INSERT INTO user SET ?', {
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: hashedPassword
		}, (error, result) => {
			if (error) {
				console.log(error)
			} else {
				res.redirect('/login')
			}
		})

	} catch {
		res.redirect('/register')
	}
})

const port = 3000
app.listen(port)
console.log('Server is running on port ' + port)
