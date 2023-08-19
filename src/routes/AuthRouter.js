const router = require('express').Router();
const AuthController = require('../controllers/AuthController.js');
const tokenVerify = require('../middlewares/auth.js');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/password', tokenVerify, AuthController.changePassword);

module.exports = router;