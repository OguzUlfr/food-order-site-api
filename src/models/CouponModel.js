const { DataTypes } = require('sequelize');
const db = require('../config/database.js');

const Coupon = db.define('coupons', {
    name:{
        type: DataTypes.STRING
    },
    code:{
        type: DataTypes.STRING
    },
    useIt:{
        type: DataTypes.ARRAY(DataTypes.INTEGER)
    },
    status:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

module.exports = Coupon;