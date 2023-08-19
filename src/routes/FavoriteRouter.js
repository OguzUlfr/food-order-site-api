const express = require('express');
const router = express.Router();
const FavoriteController = require('../controllers/FavoriteController.js');
const tokenVerify = require('../middlewares/auth.js')


router.get('/', tokenVerify, FavoriteController.index);
router.get('/:id', tokenVerify, FavoriteController.show);
router.post('/', tokenVerify, FavoriteController.store);
router.put('/:id', tokenVerify, FavoriteController.update);
router.delete('/:id', tokenVerify, FavoriteController.destroy);

module.exports = router;