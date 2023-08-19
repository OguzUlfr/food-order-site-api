const express = require('express');
const router = express.Router();
const RestaurantController = require('../controllers/RestaurantController.js');
const tokenVerify = require('../middlewares/auth.js')

router.get('/', RestaurantController.index);
router.get('/:id', tokenVerify, RestaurantController.show);
router.post('/', tokenVerify, RestaurantController.store);
router.put('/:id', tokenVerify, RestaurantController.update);
router.delete('/:id', tokenVerify, RestaurantController.destroy);

module.exports = router;