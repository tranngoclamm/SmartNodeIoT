const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
// Route tìm kiếm người dùng (Sử dụng POST)
router.post('/find', authController.findUser);

module.exports = router;
