const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Comment = require('../models/CommentModel.js');
const Menu = require('../models/MenuModel.js');
const User = require('../models/UserModel.js');

exports.index = async (req, res) => {
    try {
        const { restaurantid, menuid, userid, content, DESC, ASC} = req.query;

        const where = {}
        if(restaurantid) where.restaurantid = {[Op.like]: `%${restaurantid}%`}
        if(menuid) where.menuid = {[Op.like]: `%${menuid}%`};
        if(userid) where.userid = {[Op.like]: `%${userid}%`};
        if(content) where.content = {[Op.iLike]: `%${content}%`};

        const order = []
        if(DESC) order.push([DESC, 'DESC']);
        if(ASC) order.push([ASC, 'ASC']);

        Comment.belongsTo(Menu, { foreignKey: 'menuid' });
        Comment.belongsTo(User, { foreignKey: 'userid' });

        const comments = await Comment.findAll({ where, order, include:[
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
              },
              {
                model: Menu,
                attributes: ['id', 'name']
              }
          ]});
        comments.length ? res.status(200).json(comments) : res.status(204).json({ message: 'Yorum Mevcut Değil' })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.show = async (req, res) => {
    try {
        const comment = await Comment.findByPk( req.params.id );

        comment ? res.status(200).json(comment) : res.status(204).json({ message: 'Yorum Mevcut Değil' }) 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.store = async (req, res) => {
    try {
        const comment = await Comment.create( req.body );
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}