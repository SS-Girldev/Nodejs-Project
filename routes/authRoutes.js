//authroutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/', authController.getRegister);  //index page

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);
router.get('/profile', authController.getProfile);
router.get('/logout', authController.logout);

module.exports = router;
