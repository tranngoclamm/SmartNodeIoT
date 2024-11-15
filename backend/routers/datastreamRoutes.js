const express = require('express');
const datastreamController = require('../controllers/datastreamController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/projects/:projectId/datastreams', authMiddleware, datastreamController.createDatastream);
router.put('/projects/:projectId/datastreams/:datastreamId', authMiddleware, datastreamController.updateDatastream);
router.delete('/projects/:projectId/datastreams/:datastreamId', authMiddleware, datastreamController.deleteDatastream);

module.exports = router;
