const { DataTypes } = require('sequelize');
const db = require('../config/database.js');

const Category = db.define('categories',{
    name:{
        type: DataTypes.STRING
    },
    photo:{
        type: DataTypes.STRING
    }
})

module.exports = Category;