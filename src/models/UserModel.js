const { Sequelize } = require('sequelize');
const db = require('../config/database.js');

const User = db.define('users', {
    firstName:{
        type: Sequelize.STRING
    },
    lastName:{
        type: Sequelize.STRING
    },
    mail:{
        type: Sequelize.STRING
    },
    password:{
        type: Sequelize.STRING
    },
    birthday:{
        type: Sequelize.DATE
    },
    gender:{
        type: Sequelize.STRING
    },
    phoneNumber:{
        type: Sequelize.STRING
    },
    isAdmin:{
        type: Sequelize.STRING,
        defaultValue: false
    }
})

module.exports = User