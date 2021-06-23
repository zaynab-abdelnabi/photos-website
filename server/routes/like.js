const express = require('express');
const router = express.Router();
const controller = require('../controllers/likeController');
const middlewares = require('../middlewares/authMiddleware');
const path = require('path');

router.put('/like/:postId',middlewares.authenticated, controller.like);
router.put('/unlike/:postId', middlewares.authenticated, controller.unlike);

module.exports = router;