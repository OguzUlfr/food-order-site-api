const router = require('express').Router();
const PaymentController = require('../controllers/PaymentController.js');
const tokenVerify = require('../middlewares/auth.js')


router.get('/', tokenVerify, PaymentController.index);
router.get('/:id', tokenVerify, PaymentController.show);
router.post('/', tokenVerify, PaymentController.store);
router.put('/:id', tokenVerify, PaymentController.update);
router.delete('/:id', tokenVerify, PaymentController.destroy);

module.exports = router;