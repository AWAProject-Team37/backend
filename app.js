const dotenv = require('dotenv')
dotenv.config();
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const bcrypt = require('bcryptjs');
const passport = require('passport')
const db = require('./database')
const BasicStrategy = require('passport-http').BasicStrategy

passport.use(new BasicStrategy((email, password, done) => {
    db.query(`SELECT * from user WHERE Email="${email}"`, (error, result) => {
        if(error) console.log(error.code)
        if(result.length == 0){
            done(null, false)
        } else {
            if(bcrypt.compareSync(password, result[0].Password) === true) {
                done(null, {      
                    idUser: result[0].idUser,
                    FirstName: result[0].FirstName,
                    LastName: result[0].LastName,
                    Email: result[0].Email,
                    isManager: result[0].isManager
                })
            } else {
                done(null, false);
            }
        }
    })
}))


app.use(passport.initialize());
app.use(express.urlencoded({ extended: false }))
app.use(cors());
app.use(bodyParser.json());

app.use('/restaurants', require('./routes/restaurants'))
app.use('/orders', require('./routes/orders'))
app.use('/items', require('./routes/items'))
app.use('/register', require('./routes/register'))
app.use('/login', passport.authenticate('basic', {session: false}), require('./routes/login'))


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})