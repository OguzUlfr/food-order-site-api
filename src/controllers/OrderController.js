const { Op } = require('sequelize');
const Order = require('../models/OrderModel.js');
const User = require('../models/UserModel.js');
const Restaurant = require('../models/RestaurantModel.js');
const Menu = require('../models/MenuModel.js'); 
const Address = require('../models/AddressModel.js');

exports.index = async (req, res) => {
    try {
        const { userid, restaurantid, status, totalPrice, paymentMethod, DESC, ASC} = req.query;

        const where = {}
        if(userid) where.userid = {[Op.Like]: `%${userid}%`}
        if(restaurantid) where.restaurantid = {[Op.iLike]: `%${restaurantid}%`};
        if(status) where.address = {[Op.Like]: `%${address}%`};
        if(totalPrice) where.state = {[Op.iLike]: `%${state}%`};
        if(paymentMethod) where.city = {[Op.iLike]: `%${city}%`};

        const order = []
        if(DESC) order.push([DESC, 'DESC']);
        if(ASC) order.push([ASC, 'ASC']);

        Order.belongsTo(User, { foreignKey: 'userid' });
        Order.belongsTo(Restaurant, { foreignKey: 'restaurantid' });
        Order.belongsTo(Address, { foreignKey: 'deliveryAddress' });

        const orders = await Order.findAll({ where, order, include:[
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName', 'phoneNumber']
            },
            {
                model: Restaurant,
                attributes: ['id', 'name', 'phoneNumber', 'delivery']
            },
            {
                model: Address,
                attributes: ['id', 'address', 'state', 'city', 'notes']
            }
        ] });
        orders.length ? res.status(200).json(orders) : res.status(204).json({ message: 'Sipariş Mevcut Değil' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.show = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        order ? res.status(200).json(order) : res.status(204).json({ message: 'Sipariş Mevcut Değil' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.store = async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.update = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if(order){
            if(req.body.userid) order.userid = req.body.userid;
            if(req.body.restaurantid) order.restaurantid = req.body.restaurantid;
            if(req.body.menuid) order.menuid = req.body.menuid;
            if(req.body.mail) order.mail = req.body.mail;
            if(req.body.status) order.status = req.body.status;
            if(req.body.totalPrice) order.totalPrice = req.body.totalPrice;
            if(req.body.paymentMethod) order.paymentMethod = req.body.paymentMethod;
            if(req.body.deliveryAddress) order.deliveryAddress = req.body.deliveryAddress;

            await order.save();
            res.status(200).json({ message: 'Sipariş Güncellendi' });
        }else{
            res.status(204).json({ message: 'Sipariş Mevcut Değil' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.destroy = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if(order){
            await Order.destroy({where: { id: req.params.id }});
            res.status(200).json({ message: 'Sipariş Silindi' });
        }else{
            res.status(204).json({ message: 'Sipariş Mevcut Değil' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}