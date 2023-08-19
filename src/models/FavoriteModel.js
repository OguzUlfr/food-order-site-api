const { DataTypes } = require('sequelize');
const db = require('../config/database.js');

const Favorite = db.define('favorites', {
    useID:{
        type: DataTypes.INTEGER
    },
    itemType:{
        type: DataTypes.STRING
    },
    itemID:{
        type: DataTypes.INTEGER
    }
})

module.exports = Favorite;