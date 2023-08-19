const { DataTypes } = require('sequelize');
const db = require('../config/database.js');

const Campaigns = db.define('campaigns',{
    name:{
        type: DataTypes.STRING
    },
    photo:{
        type: DataTypes.STRING
    }
})

module.exports = Campaigns;