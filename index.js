const express = require("express")
const app = express()
const bodyparser = require("body-parser")
const connection = require("./database/dbConnection");

const User = require("./user/User")
const usersController = require("./user/UsersController")


app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())

//DB
connection.authenticate().then(() =>{
    console.log("Connection with DB SUCCESS!")
}).catch((err) =>{
    console.log(err)
})

app.use("/", usersController)

// app.get("/test", (req, res) =>{
//     res.send("<h1>Hello, world! </h1>")
// })

app.listen(3000, () =>{
    console.log(process.env.DB_USER)
    console.log('it is running!')
})