const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bcrypt = require('bcrypt');
const flash = require('connect-flash');
const path = require('path');

const LocalStrategy = require('passport-local').Strategy;
const { User } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const { sequelize } = require('./config/database'); //  using curly braces around sequelize when importing it ensures that you're specifically importing the sequelize property from the exported object in database.js. Without the curly braces, you would be importing the entire object exported from database.js, which might not have included the authenticate() function
 



// Middleware to parse JSON and URL-encoded request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const authRoutes = require('./routes/authRoutes');
const webRoutes = require('./routes/webRoutes'); 



// Set up session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

// Set up passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set up view engine
app.set('view engine', 'pug');


// Set up flash middleware
app.use(flash());

// Middleware to make flash messages available in templates
app.use((req, res, next) => {
  res.locals.successMessages = req.flash('success');
  res.locals.errorMessages = req.flash('error');
  next();
});



// Middleware to add user to res.locals for easy access in views
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});



//console user model 
//console.log('User model:', User);


// Passport LocalStrategy for user authentication
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
      const user = await User.findOne({ where: { username: username } });
      if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
          return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
  } catch (error) {
      return done(error);
  }
}));

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});



app.use('/', authRoutes);
app.use('/', webRoutes);
app.use(express.static('public'));



// Log the sequelize object to the console for testing purposes
//console.log('Sequelize object:', sequelize);

// Or you can log specific properties or methods of the sequelize object for testing purposes
//console.log('Sequelize version:', sequelize.version);
//console.log('Sequelize options:', sequelize.options);



// Or you can perform database operations using sequelize:
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



