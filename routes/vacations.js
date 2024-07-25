const express = require('express');
const EmployeeVacation = require('../models/EmployeeVacation');
const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const { employee_id, date } = req.body;
    const vacation = await EmployeeVacation.create({ employee_id, date });
    res.status(201).json(vacation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.delete('/', async (req, res) => {
  try {
    const { employee_id, date } = req.body;
    const vacation = await EmployeeVacation.findOne({
      where: {
        employee_id,
        date
      }
    });

    if (!vacation) {
      return res.status(404).json({ message: 'Vacation not found' });
    }

    await vacation.destroy();
    res.status(200).json({ message: 'Vacation canceled successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
