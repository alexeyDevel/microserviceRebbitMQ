const express = require('express');
const router = express.Router();
const taskController = require('../controllers');

router.post('/process', taskController.processTask);

module.exports = router;
