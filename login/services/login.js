const db = require('../configs/DB')
const bcrypt = require('bcryptjs')

let login = (email, password) => {
    return new Promise(async (resolve, reject) => {
        let user = await findUserByEmail(email)
        if (user) {
            await bcrypt.compare(password, user.password).then((isMatch) => {
                if (isMatch) {
                    resolve(true)
                } else {
                    reject(`Incorrect Password!`)
                }
            })
        } else {
            reject(`Email doesn't exist!`)
        }
    })
}

let findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        try {
            db.query('SELECT * FROM `user` WHERE `email` = ?', email, function(err, rows) {
                if (err) {
                    reject(err)
                }
                let user = rows[0]
                resolve(user)
            })
        } catch (err) {
            reject(err)
        }
    })
}

let findUserById = (id) => {
    return new Promise((resolve, reject) => {
        try {
            db.query('SELECT * FROM `user` WHERE `id` = ?', id, function(err, rows) {
                if (err) {
                    reject(err)
                }
                let user = rows[0]
                resolve(user)
            })
        } catch (err) {
            reject(err)
        }
    })
}

let comparePassword = (password, userObject) => {
    return new Promise(async (resolve, reject) => {
        try {
            await bcrypt.compare(password, userObject).then((isMatch) => {
                if (isMatch) {
                    resolve(true)
                } else {
                    resolve(`Incorrect Password`)
                }
            })
        } catch (err) {
            reject(err)
        }
    })
}

module.exports = {
    login: login,
    findUserByEmail: findUserByEmail,
    findUserById: findUserById,
    comparePassword: comparePassword
}