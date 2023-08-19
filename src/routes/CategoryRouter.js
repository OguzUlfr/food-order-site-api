const express = require('express')
const router = express.Router();
const CategoryController = require('../controllers/CategoryController.js')
const tokenVerify = require('../middlewares/auth.js')

router.get('/', tokenVerify, CategoryController.index)
router.get('/:id', tokenVerify, CategoryController.show)
router.post('/', tokenVerify, CategoryController.store)
router.put('/:id', tokenVerify, CategoryController.update)
router.delete('/:id', tokenVerify, CategoryController.destroy)

module.exports = router;