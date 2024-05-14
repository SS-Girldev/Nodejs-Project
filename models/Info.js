'use strict';
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database'); 
const User = require('./User');




module.exports = (sequelize, DataTypes) => {
  class Info extends Model {
    static associate(models) {
      Info.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }

  Info.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.TEXT
      },
      contact: {
        type: DataTypes.STRING
      },
      gender: {
        type: DataTypes.ENUM('male', 'female', 'other')
      },
      // Foreign key column
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Info',
      tableName: 'Info',
      timestamps: true, // Enable timestamps
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );

  return Info;
};
