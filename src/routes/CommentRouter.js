const express = require('express');
const router = express.Router();
const CommentRouter = require('../controllers/CommentController.js')
const tokenVerify = require('../middlewares/auth.js')

router.get('/', tokenVerify, CommentRouter.index);
router.get('/:id', tokenVerify, CommentRouter.show);
router.post('/', tokenVerify, CommentRouter.store);

module.exports = router;