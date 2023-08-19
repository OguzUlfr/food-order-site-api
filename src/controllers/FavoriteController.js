const { Op } = require('sequelize');
const Favorite = require('../models/FavoriteModel.js');
const Menu = require('../models/MenuModel.js');
const User = require('../models/UserModel.js');
const Restaurant = require('../models/RestaurantModel.js');

exports.index = async (req, res) => {
    try {
        const { useID, itemType, itemID, DESC, ASC } = req.query;

        const where = {}
        if(useID) where.useID = {[Op.like]: `%${useID}%`}
        if(itemType) where.itemType = {[Op.iLike]: `%${itemType}%`};
        if(itemID) where.itemID = {[Op.like]: `%${itemID}%`};

        const order = []
        if(DESC) order.push([DESC, 'DESC']);
        if(ASC) order.push([ASC, 'ASC']);

        Favorite.belongsTo(Menu, { foreignKey: 'itemID' });
        Favorite.belongsTo(Restaurant, { foreignKey: 'itemID' });
        Favorite.belongsTo(User, { foreignKey: 'useID' });

        const favorites = await Favorite.findAll({ where, order, include:[
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Menu,
                attributes: ['id', 'name']
            },
            {
                model: Restaurant,
                attributes: ['id', 'name', 'description', 'rating', 'delivery', 'deliveryTime', 'photo', 'openTime', 'closeTime']
            },
          ]});
        favorites.length ? res.status(200).json(favorites) : res.status(204).json({ message: 'Favori Mevcut Değil'});
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
}

exports.show = async (req, res) => {
    try {
        const favorite = await Favorite.findByPk(req.params.id);
        favorite ? res.status(200).json(favorite) : res.status(204).json({ message: 'Favori Mevcut Değil'});
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
}

exports.store = async (req, res) => {
    try {
        const favorite = await Favorite.create(req.body);
        res.status(201).json(favorite);
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
}

exports.update = async (req, res) => {
    try {
        const favorite = await Favorite.findByPk(req.params.id);
        if(favorite){
            if(req.body.useID) favorite.useID = req.body.useID;
            if(req.body.itemType) favorite.itemType = req.body.itemType;
            if(req.body.itemID) favorite.itemID = req.body.itemID;
            await favorite.save();
            res.status(200).json({ message: 'Favori Güncellendi' });
        }else{
            res.status(204).json({ message: 'Favori Mevcut Değil'});
        }
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
}

exports.destroy = async (req, res) => {
    try {
        const favorite = await Favorite.findByPk(req.params.id);
        if(favorite){
            await Favorite.destroy({ where: { id: req.params.id }});
            res.status(200).json({ message: 'Favori Silindi' });
        }else{
            res.status(204).json({ message: 'Favori Mevcut Değil'});
        }
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
}