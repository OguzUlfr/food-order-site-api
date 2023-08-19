const router = require('express').Router();
const OrderController = require('../controllers/OrderController.js');
const tokenVerify = require('../middlewares/auth.js')

router.get('/', tokenVerify, OrderController.index);
router.get('/:id', tokenVerify, OrderController.show);
router.post('/', tokenVerify, OrderController.store);
router.put('/:id', tokenVerify, OrderController.update);
router.delete('/:id', tokenVerify, OrderController.destroy);

module.exports = router;