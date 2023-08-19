const express = require('express');
const router = express.Router();
const CouponController = require('../controllers/CouponController.js');
const tokenVerify = require('../middlewares/auth.js')


router.get('/', tokenVerify, CouponController.index);
router.get('/:id', tokenVerify, CouponController.show);
router.post('/', tokenVerify, CouponController.store);
router.put('/:id', tokenVerify, CouponController.update);
router.delete('/:id', tokenVerify, CouponController.destroy);

module.exports = router;