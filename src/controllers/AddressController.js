const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Address = require('../models/AddressModel.js');
const User = require('../models/UserModel.js');

exports.index = async (req, res) => {
    try {
        const { userID, name, type, address, state, city, country, notes, DESC, ASC} = req.query;

        const where = {}
        if(userID) where.userID = {[Op.Like]: `%${userID}%`}
        if(name) where.name = {[Op.iLike]: `%${name}%`};
        if(type) where.type = {[Op.iLike]: `%${type}%`};
        if(address) where.address = {[Op.iLike]: `%${address}%`};
        if(state) where.state = {[Op.iLike]: `%${state}%`};
        if(city) where.city = {[Op.iLike]: `%${city}%`};
        if(country) where.country = {[Op.iLike]: `%${country}%`};
        if(notes) where.notes = {[Op.iLike]: `%${notes}%`};

        const order = []
        if(DESC) order.push([DESC, 'DESC']);
        if(ASC) order.push([ASC, 'ASC']);

        Address.belongsTo(User, { foreignKey: 'userID' });

        const addresses = await Address.findAll({ where, order, include: [{
            model: User,
            attributes: ['id', 'firstName', 'lastName', 'mail',]
          }] });
        
        addresses.length ? res.status(201).json(addresses) : res.status(204).json({ message: 'Adres Mevcut Değil'})
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.show = async (req, res) => {
    try {
        const address = await Address.findByPk(req.params.id);
        address ? res.status(200).json(address) : res.status(204).json({ message: 'Adres Mevcut Değil' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


exports.store = async (req, res) => {
    try {
        const address = await Address.create(req.body);
        res.status(201).json(address);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.update = async (req, res) => {
    try {
        const address = await Address.findOne({where: { id: req.params.id }})
        if(address){
            if(req.body.userID) address.userID = req.body.userID;
            if(req.body.name) address.name = req.body.name;
            if(req.body.type) address.type = req.body.type;
            if(req.body.address) address.address = req.body.address;
            if(req.body.state) address.state = req.body.state;
            if(req.body.city) address.city = req.body.city;
            if(req.body.country) address.country = req.body.country;
            if(req.body.notes) address.notes = req.body.notes;

            await address.save();
            res.status(200).json({message: 'Adres Güncellendi'});
        }else{
            res.status(204).json({message: 'Adres Mevcut Değil'});
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.destroy = async (req, res) => {
    try {
        const address = await Address.findOne({where: {id: req.params.id }});
        if(address){
            await Address.destroy({ where: { id: req.params.id } })
            res.status(200).json({message: 'Adres Silindi'});
        }else{
            res.status(204).json({message: 'Adres Mevcut Değil'});
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}