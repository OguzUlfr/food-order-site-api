const { DataTypes } = require('sequelize');
const db = require('../config/database.js');

const Payment = db.define('payments', {
    userID:{
        type: DataTypes.INTEGER
    },
    name:{
        type: DataTypes.STRING
    },
    method:{
        type: DataTypes.STRING
    },
    icon:{
        type: DataTypes.STRING
    },
    firstName:{
        type: DataTypes.STRING
    },
    lastName:{
        type: DataTypes.STRING
    },
    number:{
        type: DataTypes.STRING
    },
    lastDate:{
        type: DataTypes.DATE
    },
    cvv:{
        type: DataTypes.INTEGER
    }
})

module.exports = Payment;