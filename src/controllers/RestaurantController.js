const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Restaurant = require('../models/RestaurantModel.js');

exports.index = async (req, res) => {
    try {
        const { userID, name, description, mail, website, phoneNumber, rating, delivery, deliveryTime, photo, openTime, closeTime, address, state, city, country, category, status, DESC, ASC  } = req.query;

        const where = {}
        if(userID) where.userID = {[Op.iLike]: `%${userID}%`};
        if(name) where.name = {[Op.iLike]: `%${name}%`};
        if(description) where.description = {[Op.iLike]: `%${description}%`};
        if(mail) where.mail = {[Op.iLike]: `%${mail}%`};
        if(website) where.website = {[Op.iLike]: `%${website}%`};
        if(phoneNumber) where.phoneNumber = {[Op.iLike]: `%${phoneNumber}%`};
        if(rating) where.rating = {[Op.iLike]: `%${rating}%`};
        if(delivery) where.delivery = {[Op.iLike]: `%${delivery}%`};
        if(deliveryTime) where.deliveryTime = {[Op.iLike]: `%${deliveryTime}%`};
        if(photo) where.photo = {[Op.iLike]: `%${photo}%`};
        if(openTime) where.openTime = {[Op.iLike]: `%${openTime}%`};
        if(closeTime) where.closeTime = {[Op.iLike]: `%${closeTime}%`};
        if(address) where.address = {[Op.iLike]: `%${address}%`};
        if(state) where.state = {[Op.iLike]: `%${state}%`};
        if(city) where.city = {[Op.iLike]: `%${city}%`};
        if(country) where.country = {[Op.iLike]: `%${country}%`};
        if(category) where.category = {[Op.contains]: category.split(",")};
        if(status) where.status = {[Op.iLike]: `%${status}%`};
        
        const order = []
        if(DESC) order.push([DESC, 'DESC']);
        if(ASC) order.push([ASC, 'ASC']);

        const restaurants = await Restaurant.findAll({ where, order });
        restaurants.length ? res.status(201).json(restaurants) : res.status(204).json({ message: 'Restoran Mevcut Değil'});
        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.show = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByPk(req.params.id);
        restaurant ? res.status(200).json(restaurant) : res.status(204).json({ message: 'Restoran Mevcut Değil' })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.store= async (req, res) => {
    try {
        const restaurant = await Restaurant.create(req.body);
        res.status(201).json(restaurant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.update = async (req, res) => {
    try {
        const restaurant = await Restaurant.findOne({ where: { id: req.params.id } });
        if(restaurant){
            if(req.body.userID) restaurant.userID = req.body.userID;
            if(req.body.name) restaurant.name = req.body.name;
            if(req.body.description) restaurant.description = req.body.description;
            if(req.body.mail) restaurant.mail = req.body.mail;
            if(req.body.website) restaurant.website = req.body.website;
            if(req.body.phoneNumber) restaurant.phoneNumber = req.body.phoneNumber;
            if(req.body.rating) restaurant.rating = req.body.rating;
            if(req.body.delivery) restaurant.delivery = req.body.delivery;
            if(req.body.deliveryTime) restaurant.deliveryTime = req.body.deliveryTime;
            if(req.body.photo) restaurant.photo = req.body.photo;
            if(req.body.openTime) restaurant.openTime = req.body.openTime;
            if(req.body.closeTime) restaurant.closeTime = req.body.closeTime;
            if(req.body.address) restaurant.address = req.body.address;
            if(req.body.state) restaurant.state = req.body.state;
            if(req.body.city) restaurant.city = req.body.city;
            if(req.body.country) restaurant.country = req.body.country;
            if(req.body.category) restaurant.category = req.body.category;

            await restaurant.save();
            res.status(200).json({message: 'Restoran Güncellendi'});
        }else{
            res.status(204).json({ message: 'Restoran Mevcut Değil' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.destroy = async (req, res) => {
    try {
        const restaurant = await Restaurant.findOne({ where: { id: req.params.id } });
        if(restaurant){
            await Restaurant.destroy({ where: { id: req.params.id } })
            res.status(200).json({message: 'Restoran Silindi'});
        }else{
            res.status(204).json({ message: 'Restoran Mevcut Değil'});
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}