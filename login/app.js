if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

const bcrypt = require('bcrypt')
const database = require('./config/database')
const express = require('express')
const flash = require('express-flash')
const methodOverride = require('method-override')
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
app.use(methodOverride('_method'))
app.use(passport.initialize())
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))
app.use(session())


// RENDER PAGES
app.get('/', checkAuthenticated, (req, res) => {
	res.render('index.ejs', { group : 'AWA-Project-37' })
})

app.get('/login', checkNotAuthenticated, (req, res) => {
	res.render('login.ejs')
})

app.get('/register', checkNotAuthenticated, (req, res) => {
	res.render('register.ejs')
})


// LOGIN
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true
}))


// REGISTER
app.post('/register', checkNotAuthenticated, async (req, res) => {
	try {
		const { firstName, lastName, email, password, passwordConfirm } = req.body

		// Valid email check
		database.query('SELECT email FROM user WHERE email = ?', [email], (error, result) => {
			if (error) {
				console.log(error)
			}
			if (result.length > 0) {
				return res.redirect('/register', { message: 'Email has already be used!' })
			} else if (password !== passwordConfirm) { // Password match check
				return res.redirect('/register', { message: 'Passwords does not match!' })
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


// LOGOUT
app.delete('/logout', (req, res) => {
	req.logOut()
	res.redirect('/login')
})


// LOGIN CHECK
function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next()
	}
	res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return res.redirect('/')
	}
	next()
}


// PORT
const port = process.env.PORT || 3000
app.listen(port)
console.log('Server is running on port ' + port)
