const express = require("express")
const router = express.Router()
const User = require("./User")
const bcrypt = require("bcryptjs")


router.get("/users", (req, res) =>{
    User.findAll().then(users =>{
        res.json(users)
    })
})

router.post("/register", (req, res) =>{
    const {name, email, password, birth, phone} = req.body

    User.findOne({where: {email: email}}).then(user =>{
        if(user == undefined){
            console.log("im here")
            var salt = bcrypt.genSaltSync(10)
            var hash = bcrypt.hashSync(password, salt)

            User.create({
                email: email,
                password: hash,
                phone: phone,
                birth: birth,
                name: name
            }).then(() =>{
                res.sendStatus(200)
            }).catch((err) =>{
                res.sendStatus(418)
                res.send(err)

            })
        }else{
            res.sendStatus(405)
        }
    })
})


module.exports = router;