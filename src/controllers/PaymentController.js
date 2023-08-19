const { Op } = require('sequelize');
const Payment = require('../models/PaymentModel.js');

exports.index = async (req, res) => {
    try {
        const { userID, name, method, icon, firstName, lastName, number, lastDate, cvv, DESC, ASC} = req.query;

        const where = {}
        if(userID) where.userID = {[Op.Like]: `%${userID}%`}
        if(name) where.name = {[Op.iLike]: `%${name}%`};
        if(method) where.method = {[Op.iLike]: `%${method}%`};
        if(icon) where.icon = {[Op.iLike]: `%${icon}%`};
        if(firstName) where.firstName = {[Op.iLike]: `%${firstName}%`};
        if(lastName) where.lastName = {[Op.iLike]: `%${lastName}%`};
        if(number) where.number = {[Op.Like]: `%${number}%`};
        if(lastDate) where.lastDate = {[Op.iLike]: `%${lastDate}%`};
        if(cvv) where.cvv = {[Op.Like]: `%${cvv}%`};

        const order = []
        if(DESC) order.push([DESC, 'DESC']);
        if(ASC) order.push([ASC, 'ASC']);

        const payments = await Payment.findAll({ where, order });
        payments.length ? res.status(200).json(payments) : res.status(204).json({ message: 'Ödeme Yöntemi Mevcut Değil' })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.show = async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.id);
        payment ? res.status(200).json(payment) : res.status(204).json({ message: 'Ödeme Yöntemi Mevcut Değil' })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.store = async (req, res) =>{
    try {
        const payment = await Payment.create(req.body);
        res.status(201).json(payment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.update = async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.id);
        if(payment){
            if(req.body.userID) payment.userID = req.body.userID;
            if(req.body.name) payment.name = req.body.name;
            if(req.body.method) payment.method = req.body.method;
            if(req.body.icon) payment.icon = req.body.icon;
            if(req.body.firstName) payment.firstName = req.body.firstName;
            if(req.body.lastName) payment.lastName = req.body.lastName;
            if(req.body.number) payment.number = req.body.number;
            if(req.body.lastDate) payment.lastDate = req.body.lastDate;
            if(req.body.cvv) payment.cvv = req.body.cvv;

            await payment.save();
            res.status(200).json({ message: 'Ödeme Yöntemi Güncellendi'});
        }else{
            res.status(204).json({ message: 'Ödeme Yöntemi Mevcut Değil' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.destroy = async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.id);
        if(payment){
            await Payment.destroy({ where: { id: req.params.id }});
            res.status(200).json({ message: 'Ödeme Yöntemi Silindi'});
        }else{
            res.status(204).json({ message: 'Ödeme Yöntemi Mevcut Değil' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}