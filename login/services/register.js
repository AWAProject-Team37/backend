const db = require('../configs/DB')
const bcrypt = require('bcryptjs')

let register = (data) => {
    return new Promise(async (resolve, reject) => {
        let existEmail = await checkExistEmail(data.email)
        if (existEmail) {
            reject(`This email "${data.email}" has already exist!`)
        } else {
            let salt = bcrypt.genSaltSync(10)
            let newUser = {
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

let checkExistEmail = (email) => {
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