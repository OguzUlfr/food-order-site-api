const User = require('../models/UserModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.register = async (req, res) => {
    try {
        const user = await User.findOne({ where: { mail: req.body.mail }});
        if(!user){
            const passwordHash = await bcrypt.hash(req.body.password, 12);
            const newUser = await User.create({...req.body, password: passwordHash}, {returning: true, attributes: { exclude: ['password'] }});
            const token =  jwt.sign({mail:newUser.mail}, process.env.JWT_SECRET_KEY , { expiresIn: '2h' });
            res.status(201).json({ user: {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                mail: newUser.mail,
                birthday: newUser.birthday,
                gender: newUser.gender,
                phoneNumber: newUser.phoneNumber
            }, token: token});
        }else{
            res.status(409).json({ message: 'Kullanıcı Zaten Mevcut' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.login = async (req, res) =>{
    try {
        const user = await User.findOne({ where: { mail: req.body.mail }});
        if(user){
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if (result === true) {
                    const token =  jwt.sign({mail:user.mail}, process.env.JWT_SECRET_KEY , { expiresIn: '1h' });
                    res.status(200).json({ user: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        mail: user.mail,
                        birthday: user.birthday,
                        gender: user.gender,
                        phoneNumber: user.phoneNumber
                    }, token: token});
                } else {
                    res.status(400).json({ message: 'Parola Hatalı' });
                }
              })
        }else{
            res.status(400).json({ message: 'Kullanıcı Mevcut Değil' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.changePassword = async (req, res) =>{
    try {
        const user = await User.findOne({ where: { id: req.params.id } });
        if (user) {
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if (result === true) {
                    (async () => {
                    const passwordHash = await bcrypt.hash(req.body.password, 12);
                    user.password = passwordHash;
                    await user.save();
                    res.status(200).json({message: 'Parola Güncellendi'});
                    })();
                } else {
                    res.status(400).json({ message: 'Eski Parola Hatalı' });
                }
              })
        } else {
            res.status(204).json({message: 'Kullanıcı Mevcut Değil'});
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}