const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const morgan = require('morgan');

const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');

require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use(session({
	secret: 'projectgroup37',
	resave: true,
	saveUninitialized: true
 } ));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./routes/routes.js')(app, passport);

const port = 3000;
app.listen(port);
console.log('Server is running on port ' + port);
