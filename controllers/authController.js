const bcrypt = require('bcrypt');
const passport = require('passport');
const { User } = require('../config/database');

const sequelize = require('../config/database'); 

exports.getLogin = (req, res) => {
  res.render('login');
};

exports.postLogin = passport.authenticate('local', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
});

exports.getRegister = (req, res) => {
  res.render('register');
};

exports.postRegister = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, email });
    await user.save();
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.render('register', { error: 'Failed to register user.' });
  }
};


exports.getProfile = (req, res) => {
  if (req.isAuthenticated()) {
    const successMessage = req.query.successMessage;
    res.render('profile', { successMessage });
  } else {
    res.redirect('/login');
  }
};

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return res.redirect('/');
    }
    res.redirect('/login');
  });
};

