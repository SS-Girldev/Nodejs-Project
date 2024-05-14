// sequelize-init.js

const Sequelize = require('sequelize');
const sequelize = require('./config/database');

const UserModel = require('./models/User');
const InfoModel = require('./models/Info');


const models = {
  User: UserModel,
  Info: InfoModel,
};

Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

module.exports = { sequelize, models };
