// webRoutes.js

const express = require('express');
const router = express.Router();
const { storeInfo } = require('../controllers/infoController');

// POST route to store info
router.post('/profile', storeInfo);

router.get('/flash', (req, res) => {
    req.flash('success', 'Flash message added!');
    req.flash('error', 'An error occurred!');
    res.redirect('/');
  });

module.exports = router;