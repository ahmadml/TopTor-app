// models/Client.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Client = sequelize.define('Client', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false, // השדה הזה הוא חובה
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false, // השדה הזה הוא חובה
    validate: {
      isEmail: true // לוודא שהאימייל הוא בפורמט תקין
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false, // השדה הזה הוא חובה
  },
}, {
  tableName: 'clients',
  timestamps: false,
});

module.exports = Client;
