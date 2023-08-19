const { DataTypes } = require('sequelize');
const  db = require('../config/database.js');

const Comment = db.define('comments', {
    restaurantid:{
        type: DataTypes.INTEGER
    },
    menuid:{
        type: DataTypes.INTEGER
    },
    userid:{
        type: DataTypes.INTEGER
    },
    content:{
        type: DataTypes.STRING
    }
})

module.exports = Comment