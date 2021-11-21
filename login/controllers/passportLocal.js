const passportLocal = require('passport-local')
const passport = require('passport')
const login = require('../services/login')

const LocalStrategy = passportLocal.Strategy

const initPassportLocal = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    async (req, email, password, done) => {
        try {
            await login.findUserNameByEmail(email).then(async (user) => {
                if (!user) {
                    return done(null, false, req.flash("errors", `This user email "${email}" doesn't exist`))
                }
                if (user) {
                    let match = await login.comparePassword(password, user)
                    if (match === true) {
                        return done(null, user, null)
                    } else {
                        return done(null, false, req.flash("errors", match))
                    }
                }
            })
        } catch (err) {
            console.log(err)
            return done(null, false, { message: error })
        }
    }))
}

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    login.findUserNameByID(id).then((user) => {
        return done(null, user)
    }).catch(error => {
        return done(error, null)
    })
})

module.exports = { initPassportLocal: initPassportLocal }