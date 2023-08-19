const express = require('express');
const router = express.Router();
const MenuController = require('../controllers/MenuController.js');
const tokenVerify = require('../middlewares/auth.js')


router.get('/', tokenVerify, MenuController.index);
router.get('/:id', tokenVerify, MenuController.show);
router.post('/', tokenVerify, MenuController.store);
router.put('/:id', tokenVerify, MenuController.update);
router.delete('/:id', tokenVerify, MenuController.destroy);

module.exports = router;