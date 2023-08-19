const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Campaign = require('../models/CampaignModel.js');

exports.index = async (req, res) => {
    try {
        const { name, photo, DESC, ASC} = req.query;

        const where = {};
        if(name) where.name = {[Op.iLike]: `%${name}%`}
        if(photo) where.photo = {[Op.iLike]: `%${photo}%`}

        const order = []
        if(DESC) order.push([DESC, 'DESC']);
        if(ASC) order.push([ASC, 'ASC']);

        const campaigns = await Campaign.findAll({where, order});

        campaigns.length ? res.status(201).json(campaigns) : res.status(204).json({ message: 'Kampanya Mevcut Değil'});
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
}

exports.show = async (req, res) => {
    try {
        const campaign = await Campaign.findByPk(req.params.id)
        campaign ? res.status(200).json(campaign) : res.status(204).json({ message: 'Kampanya Mevcut Değil'});
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
}

exports.store = async (req, res) => {
    try {
        const campaign = await Campaign.create(req.body);
        res.status(201).json(campaign);
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
}

exports.update = async (req, res) => {
    try {
        const campaign = await Campaign.findOne({where: { id: req.params.id}});
        if(campaign){
            if(req.body.name) campaign.name = req.body.name;
            if(req.body.photo) campaign.photo = req.body.photo;
            await campaign.save();
            res.status(200).json({ message: 'Kampanya Güncellendi'});
        }else{
            res.status(204).json({ message: 'Kampanya Mevcut Değil'});
        }
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
}

exports.destroy = async (req, res) =>{
    try {
        const campaign = await Campaign.findOne({where: { id: req.params.id}});
        if(campaign){
            await Campaign.destroy({ where: { id: req.params.id }});
            res.status(200).json({ message: 'Kampanya Silindi'});
        }else{
            res.status(204).json({ message: 'Kampanya Mevcut Değil'});
        }
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
}