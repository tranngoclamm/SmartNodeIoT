const express = require('express');
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/projects', authMiddleware, projectController.createProject);

module.exports = router;
