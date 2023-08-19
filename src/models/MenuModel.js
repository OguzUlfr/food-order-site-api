const { DataTypes } = require('sequelize');
const db = require('../config/database.js');

const Menu = db.define('menus', {
    restaurantid:{
        type: DataTypes.INTEGER
    },
    name:{
        type: DataTypes.STRING
    },
    description:{
        type: DataTypes.STRING
    },
    photo:{
        type: DataTypes.STRING
    },
    category:{
        type: DataTypes.STRING
    },
    price:{
        type: DataTypes.INTEGER
    },
    status:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

module.exports = Menu;