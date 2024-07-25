const express = require('express');
const sequelize = require('./config/db');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/availability', require('./routes/availability'));
app.use('/appointments', require('./routes/appointments'));
app.use('/vacations', require('./routes/vacations'));


sequelize.sync()
    .then(() => {
        console.log('Database synced successfully.');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(err => console.error('Unable to sync the database:', err));
