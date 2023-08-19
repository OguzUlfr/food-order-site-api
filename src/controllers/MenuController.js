const { Op } = require('sequelize');
const Menu = require('../models/MenuModel.js');

exports.index = async (req, res) => {
    try {
        const { restaurantid, name, description, photo, category, price, status, DESC, ASC } = req.query;

        const where = {}
        if(restaurantid) where.restaurantid = {[Op.like]: `%${restaurantid}%`}
        if(name) where.name = {[Op.iLike]: `%${name}%`};
        if(description) where.description = {[Op.iLike]: `%${description}%`};
        if(photo) where.photo = {[Op.iLike]: `%${photo}%`};
        if(category) where.category = {[Op.like]: `%${category}%`};
        if(price) where.price = {[Op.iLike]: `%${price}%`};
        if(status) where.status = {[Op.iLike]: `%${status}%`};

        const order = []
        if(DESC) order.push([DESC, 'DESC']);
        if(ASC) order.push([ASC, 'ASC']);

        const menus = await Menu.findAll({ where, order});
        menus.length ? res.status(200).json(menus) : res.status(204).json({ message: 'Menü Mevcut Değil' })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.show = async (req, res) => {
    try {
        const menu = await Menu.findByPk(req.params.id);
        menu ? res.status(200).json(menu) : res.status(204).json({ message: 'Menü Mevcut Değil' })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.store = async (req, res) => {
    try {
        const menu = await Menu.create(req.body);
        res.status(201).json(menu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.update = async (req, res) =>{
    try {
        const menu = await Menu.findByPk(req.params.id);
        if(menu){
            if(req.body.restaurantid) menu.restaurantid = req.body.restaurantid;
            if(req.body.name) menu.name = req.body.name;
            if(req.body.description) menu.description = req.body.description;
            if(req.body.photo) menu.photo = req.body.photo;
            if(req.body.category) menu.category = req.body.category;
            if(req.body.price) menu.price = req.body.price;
            if(req.body.status) menu.status = req.body.status;

            await menu.save();
            res.status(200).json({ message: 'Menü Güncellendi' })
        }else{
            res.status(204).json({ message: 'Menü Mevcut Değil' })
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.destroy = async (req, res) =>{
    try {
        const menu = await Menu.findByPk(req.params.id);
        if(menu){
            await Menu.destroy({where: {id: req.params.id}});
            res.status(200).json({ message: 'Menü Silindi' });
        }else{
            res.status(204).json({ message: 'Menü Mevcut Değil' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}