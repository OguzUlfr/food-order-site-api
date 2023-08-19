const { DataTypes  } = require('sequelize');
const db = require('../config/database.js')

const Address = db.define('addresses', {
    userID:{
        type: DataTypes.INTEGER
    },
    name:{
        type: DataTypes.STRING
    },
    type:{
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
    notes:{
        type: DataTypes.STRING
    }
})

module.exports = Address;