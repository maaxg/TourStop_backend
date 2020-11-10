const express = require("express")
const app = express()
const bodyparser = require("body-parser")
const cors = require("cors")

const connection = require("./database/dbConnection")

const User = require("./user/User")
const usersController = require("./user/UsersController")

app.use(cors())

app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())

//DB
connection.authenticate().then(() =>{
    console.log("Connection with DB SUCCESS!")
}).catch((err) =>{
    console.log(err)
})

app.use("/", usersController)



app.listen(3000, () =>{
    console.log(process.env.DB_USER)
    console.log('it is running!')
})




// function auth(req, res, next){
//     const authToken = req.headers['authorization']
//     if(authToken != undefined){
//         var bearer = authToken.split(" ")
//         var token = bearer[1]
//         jwt.verify(token, JWT_SECRET, (err, data) =>{
//             if(err){
//                 res.status(401)
//                 res.json({err: "Token inválido!"})

//             }else{
//                 req.token = token
//                 req.loggedUser = {
//                     id: data.id,
//                     name: data.name,
//                     email: data.email
//                 }
//                 next()
//             }
//         })

//     }else{
//         res.status(401)
//         res.json({err: "Token inválido!"})
//     }
// }


