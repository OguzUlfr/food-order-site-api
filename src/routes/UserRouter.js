const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController.js');
const tokenVerify = require('../middlewares/auth.js')

router.get('/', tokenVerify, UserController.index);
router.get('/:id', tokenVerify, UserController.show);
router.post('/', tokenVerify, UserController.store);
router.put('/:id', tokenVerify, UserController.update);
router.delete('/:id', tokenVerify, UserController.destroy);

module.exports = router;