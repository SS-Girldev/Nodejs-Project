// webRoutes.js

const express = require('express');
const router = express.Router();
const { storeInfo } = require('../controllers/infoController');

// POST route to store info
router.post('/profile', storeInfo);

module.exports = router;