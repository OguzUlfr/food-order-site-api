const { DataTypes } = require('sequelize');
const db = require('../config/database.js');

const Order = db.define('orders', {
    userid:{
        type: DataTypes.INTEGER
    },
    restaurantid:{
        type: DataTypes.INTEGER
    },
    status:{
        type: DataTypes.STRING,
        defaultValue: 'Order received'
    },
    totalPrice:{
        type: DataTypes.INTEGER
    },
    paymentMethod:{
        type: DataTypes.STRING
    },
    deliveryAddress:{
        type: DataTypes.INTEGER
    },
    menus:{
        type: DataTypes.ARRAY(DataTypes.STRING)
    }
})

module.exports = Order;