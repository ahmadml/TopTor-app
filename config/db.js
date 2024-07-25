const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Barbershop', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres', // עדכון לדיאלקט של PostgreSQL
  logging: false, // אם אתה רוצה לראות את השאילתות בקונסול
});

async function authenticate() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

authenticate();

module.exports = sequelize;
