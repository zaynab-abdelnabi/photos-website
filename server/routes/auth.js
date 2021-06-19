const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/login',authMiddleware.guest, controller.login);
router.post('/register', authMiddleware.guest, controller.register);

module.exports = router;