const db = require('../configs/DB')
const bcrypt = require('bcryptjs')

const register = (data) => {
    return new Promise(async (resolve, reject) => {
        const existEmail = await checkExistEmail(data.email)
        if (existEmail) {
            reject(`This email "${data.email}" has already exist!`)
        } else {
            const salt = bcrypt.genSaltSync(10)
            const newUser = {
                fname: data.fname,
                lname: data.lname,
                email: data.email,
                password: bcrypt.hashSync(data.password, salt)
            }
            db.query('INSERT INTO user set ?', newUser, function(err, rows) {
                if (err) {
                    reject(false)
                }
                resolve('Successful!')
            })
        }
    })
}

const checkExistEmail = (email) => {
    return new Promise((resolve, reject) => {
        try {
            db.query('SELECT * FROM `user` WHERE `email` = ?', email, function(err, rows) {
                if (err) {
                    reject(err)
                }
                if (rows.length > 0) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
        } catch (err) {
            reject(err)
        }
    })
}

module.exports = {
    register: register
}