const Sequelize = require("sequelize")
const connection = require("../database/dbConnection")

const User = connection.define('users', {
    email:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    },
    phone:{
        type: Sequelize.STRING,
        allowNull: false
    },
    birth:{
        type: Sequelize.STRING,
        allowNull: false
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    }

})

//User.sync({force: true})

module.exports = User