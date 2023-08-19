const express = require('express')
const router = express.Router();
const CampaignController = require('../controllers/CampaignController.js')
const tokenVerify = require('../middlewares/auth.js')

router.get('/', CampaignController.index)
router.get('/:id', tokenVerify, CampaignController.show)
router.post('/', tokenVerify, CampaignController.store)
router.put('/:id', tokenVerify, CampaignController.update)
router.delete('/:id', tokenVerify, CampaignController.destroy)

module.exports = router;