const express = require('express');
const router = express.Router();
const AddressController = require('../controllers/AddressController.js');
const tokenVerify = require('../middlewares/auth.js')

router.get('/', tokenVerify, AddressController.index);
router.get('/:id', tokenVerify, AddressController.show);
router.post('/', tokenVerify, AddressController.store);
router.put('/:id', tokenVerify, AddressController.update)
router.delete('/:id', tokenVerify, AddressController.destroy)

module.exports = router;