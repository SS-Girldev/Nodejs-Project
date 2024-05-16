//database.js


const { Sequelize } = require('sequelize');

const config = require('../config/config.json');

const sequelize = new Sequelize(config.development); // Adjust based on your environment


// Import models and initialize them
const User = require('../models/User')(sequelize, Sequelize.DataTypes);
const Info = require('../models/Info')(sequelize, Sequelize.DataTypes);


// Define associations between models if necessary
// For example:
// User.hasMany(OtherModel);
// OtherModel.belongsTo(User);
Info.belongsTo(User, { foreignKey: 'user_id' });
User.hasOne(Info, { foreignKey: 'user_id' });

// Synchronize models with the database (this creates tables if they don't exist)
sequelize.sync();

// Export the initialized Sequelize instance and models
module.exports = {
  sequelize,
  User,
  Info,
  // Export other models as needed
};
