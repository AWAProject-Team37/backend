const db = require('../database');
const bcrypt = require('bcryptjs');

exports.registerUser = (req, res) => {
    const salt = bcrypt.genSaltSync(5);
    const hashedPassword = bcrypt.hashSync(req.body.Password, salt);

    if(req.body.FirstName === undefined || req.body.LastName === undefined, req.body.Email === undefined) res.send("Failed to register");
    db.query(`INSERT into user VALUES(null, "${req.body.FirstName}", "${req.body.LastName}", "${req.body.Email}", "${hashedPassword}", ${req.body.isManager})`, (error, result) => {
        if(error){
            if(error.code=="ER_DUP_ENTRY"){
                res.send("This email is already used")
            }
            console.log(error.code);
        } else {
            res.send("Registered");
        }
    })

}
