const { Op } = require('sequelize');
const Coupon = require('../models/CouponModel.js');

exports.index = async (req, res) => {
    try {
        const { name, code, useIt, status, DESC, ASC } = req.query;

        const where = {};
        if(name) where.name = {[Op.iLike]: `%${name}%`};
        if(code) where.code = {[Op.iLike]: `%${code}%`};
        if(useIt) where.useIt = {[Op.iLike]: `%${useIt}%`};
        if(status) where.status = {[Op.iLike]: `%${status}%`};

        const order = []
        if(DESC) order.push([DESC, 'DESC']);
        if(ASC) order.push([ASC, 'ASC']);

        const coupons = await Coupon.findAll({ where, order });
        coupons.length ? res.status(200).json(coupons) : res.status(204).json({ message: 'Kupon Mevcut Değil'});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.show = async (req, res) => {
    try {
        const coupon = await Coupon.findByPk(req.params.id);
        coupon ? res.status(200).json(coupon) : res.status(204).json({ message: 'Kupon Mevcut Değil'});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.store = async (req, res) => {
    try {
        const coupon = await Coupon.create(req.body);
        res.status(201).json(coupon);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.update = async (req, res) => {
    try {
        const coupon = await Coupon.findByPk( req.params.id );
        if(coupon){
            if(req.body.name) coupon.name = req.body.name;          
            if(req.body.code) coupon.code = req.body.code;
            if(req.body.useIt) coupon.useIt = req.body.useIt;
            if(req.body.status) coupon.status = req.body.status;

            await coupon.save();
            res.status(200).json({ message : 'Kupon Güncellendi'})
        }else{
            res.status(204).json({ message: 'Kupon Mevcut Değil' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.destroy = async (req, res) => {
    try {
        const coupon = await Coupon.findByPk( req.params.id );
        if(coupon){
            await Coupon.destroy({ where: { id: req.params.id }});
            res.status(200).json({ message: 'Kupon Silindi' });
        }else{
            res.status(204).json({ message: 'Kupon Mevcut Değil' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}