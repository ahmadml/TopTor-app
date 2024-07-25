const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const EmployeeVacation = sequelize.define('EmployeeVacation', {
  employee_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'employees',
      key: 'id',
    },
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  }
 }, {
    tableName: 'employee_vacations',
    timestamps: false
});

module.exports = EmployeeVacation;
