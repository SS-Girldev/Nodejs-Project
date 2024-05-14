//database.js


const { Sequelize } = require('sequelize');
const config = require('../config/config.json');

const sequelize = new Sequelize(config.development); // Adjust based on your environment


// Import models and initialize them
const User = require('../models/User')(sequelize, Sequelize.DataTypes);
// Import other models and initialize them as needed

// Define associations between models if necessary
// For example:
// User.hasMany(OtherModel);
// OtherModel.belongsTo(User);

// Synchronize models with the database (this creates tables if they don't exist)
sequelize.sync();

// Export the initialized Sequelize instance and models
module.exports = {
  sequelize,
  User,
  // Export other models as needed
};
