const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const router = express.Router()
const User = require("./User")


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
                res.json({error: "Dude... that's wrong..."})

            })
        }else{
            res.sendStatus(405)
        }
    })
})


router.post("/auth", (req, res) =>{
    const {email, password} = req.body

    if(email != undefined){
        User.findOne({where: {email: email}}).then(user =>{
            if(user != undefined){
                var correct = bcrypt.compareSync(password, user.password)
                if(correct){
                    jwt.sign({id: user.id, name: user.name, email: user.email, birthDate: user.birth, phone: user.phone}, process.env.JWT_SECRET, {expiresIn: '7d'}, (err, token) =>{
                        if(err){
                            res.status(500)
                            res.json({error: "Falha interna, deu ruim!"})
                        }else{
                            res.status(200)
                            return res.json({token: token})
                        }
                    })
                }else{
                    res.status(401)
                    res.json({error: "Credenciais inválidas!"})
                }
            }else{
                res.status(401)
                res.json({error: "Credenciais inválidas"})
            }
        }).catch((err) =>{
            res.status(401)
            res.json({eror: "Credenciais erradas"})
        })
    }else{
        res.status(400)
        res.json({error: "E-email inválido"})
    }
})


module.exports = router;