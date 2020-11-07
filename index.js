const express = require("express")
const bodyparser = require("body-parser")
const app = express()

app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())

app.get("/test", (req, res) =>{
    res.send("<h1>Hello, world! </h1>")
})

app.listen(3000, () =>{
    console.log('it is running!')
})