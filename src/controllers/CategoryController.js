const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Category = require('../models/CategoryModel.js');

exports.index =  async (req, res) => {
    try {
        const { name, photo, DESC, ASC} = req.query;

        const where = {};
        if(name) where.name = {[Op.iLike]: `%${name}%`}
        if(photo) where.photo = {[Op.iLike]: `%${photo}%`}

        const order = []
        if(DESC) order.push([DESC, 'DESC']);
        if(ASC) order.push([ASC, 'ASC']);

        const categories = await Category.findAll({where, order});

        categories.length ? res.status(200).json(categories) : res.status(204).json({ message: 'Kategori Mevcut Değil'})
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
}

exports.show = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id)
        category ? res.status(200).json(category) : res.status(204).json({ message: 'Kategori Mevcut Değil'})
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
}

exports.store = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
}

exports.update = async (req, res) => {
    try {
        const category = await Category.findOne({where: { id: req.params.id}});
        if(category){
            if(req.body.name) category.name = req.body.name;
            if(req.body.photo) category.photo = req.body.photo;
            await category.save();
            res.status(200).json({ message: 'Kategori Güncellendi'});
        }else{
            res.status(204).json({ message: 'Kategori Mevcut Değil'});
        }
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
}

exports.destroy = async (req, res) =>{
    try {
        const category = await Category.findOne({where: { id: req.params.id}});
        if(category){
            await Category.destroy({ where: { id: req.params.id }});
            res.status(200).json({ message: 'Kategori Silindi'});
        }else{
            res.status(204).json({ message: 'Kategori Mevcut Değil'});
        }
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
}