const { DataTypes  } = require('sequelize');
const db = require('../config/database.js')

const Restaurant = db.define('restaurant', {
    userID:{
        type: DataTypes.INTEGER
    },
    name:{
        type: DataTypes.STRING
    },
    description:{
        type: DataTypes.STRING
    },
    mail:{
        type: DataTypes.STRING
    },
    website:{
        type: DataTypes.STRING
    },
    phoneNumber:{
        type: DataTypes.STRING
    },
    rating:{
        type: DataTypes.INTEGER
    },
    delivery:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    deliveryTime:{
        type: DataTypes.INTEGER
    },
    photo:{
        type: DataTypes.STRING
    },
    openTime:{
        type: DataTypes.STRING
    },
    closeTime:{
        type: DataTypes.STRING
    },
    address:{
        type: DataTypes.STRING
    },
    state:{
        type: DataTypes.STRING
    },
    city:{
        type: DataTypes.STRING
    },
    country:{
        type: DataTypes.STRING
    },
    category:{
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
    },
    status:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

module.exports = Restaurant;