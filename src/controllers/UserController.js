const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const User = require('../models/UserModel.js');
const bcrypt = require('bcrypt');


exports.index = async (req, res) => {
    try {
        const { firstName, lastName, mail, birthday, gender, phoneNumber, DESC, ASC  } = req.query;

        const where = {}
        if(firstName) where.firstName = {[Op.iLike]: `%${firstName}%`};
        if(lastName) where.lastName = {[Op.iLike]: `%${lastName}%`};
        if(mail) where.mail = {[Op.iLike]: `%${mail}%`};
        if(birthday) where.birthday = {[Op.iLike]: `%${birthday}%`};
        if(gender) where.gender = {[Op.iLike]: `%${gender}%`};
        if(phoneNumber) where.phoneNumber = {[Op.iLike]: `%${phoneNumber}%`};

        const order = []
        if(DESC) order.push([DESC, 'DESC']);
        if(ASC) order.push([ASC, 'ASC']);

        const users = await User.findAll({ where, order });
        users.length ? res.status(201).json(users) : res.status(204).json({ message: 'Kullanıcı Mevcut Değil'})

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.show = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id) 
        user ? res.status(201).json(user) : res.status(204).json({ message: 'Kullanıcı Mevcut Değil'})
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.store = async (req, res) => {
    try {
        const { password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await User.create({ ...req.body, password: passwordHash});
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.update = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.params.id } });
        if (user) {
            if(req.body.firstName) user.firstName = req.body.firstName;
            if(req.body.lastName) user.lastName = req.body.lastName;
            if(req.body.mail) user.mail = req.body.mail;
            if(req.body.birthday) user.birthday = req.body.birthday;
            if(req.body.gender) user.gender = req.body.gender;
            if(req.body.phoneNumber) user.phoneNumber = req.body.phoneNumber;
            if(req.body.isAdmin) user.isAdmin = req.body.isAdmin;

            await user.save();
            res.status(200).json({message: 'Kullanıcı Güncellendi'});
          } else {
            res.status(204).json({message: 'Kullanıcı Mevcut Değil'});
          }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.destroy = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.params.id } });
        if (user) {
            await user.destroy({ where: { id: req.params.id } })
            res.status(200).json({message: 'Kullanıcı Silindi'});
        } else {
            res.status(204).json({message: 'Kullanıcı Mevcut Değil'});
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}