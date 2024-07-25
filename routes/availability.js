const express = require('express');
const { Op } = require('sequelize');
const Appointment = require('../models/Appointment');
const EmployeeVacation = require('../models/EmployeeVacation');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { employee_id } = req.query;
    if (!employee_id) {
      return res.status(400).json({ message: "employee_id is required" });
    }

    const today = new Date();
    const sevenDaysAhead = new Date(today);
    sevenDaysAhead.setDate(today.getDate() + 7);

    // Fetch appointments for the employee within the next 7 days
    const appointments = await Appointment.findAll({
      where: {
        employee_id,
        date: {
          [Op.between]: [today, sevenDaysAhead],
        },
      },
      order: [['date', 'ASC'], ['start_time', 'ASC']],
    });

    // Fetch vacations for the employee within the next 7 days
    const vacations = await EmployeeVacation.findAll({
      where: {
        employee_id,
        date: {
          [Op.between]: [today, sevenDaysAhead],
        },
      },
      order: [['date', 'ASC']],
    });

    // Define available slots (e.g., 9 AM to 5 PM with 30-minute intervals)
    const availableSlots = generateAvailableSlots(today, sevenDaysAhead, appointments, vacations);

    // Send available slots to the client
    res.json(availableSlots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const generateAvailableSlots = (start, end, appointments, vacations) => {
  const slots = [];
  let current = new Date(start);

  while (current <= end) {
    const date = current.toISOString().split('T')[0]; // YYYY-MM-DD format

    const isVacation = vacations.some(vacation => {
      const vacationDate = new Date(vacation.date).toISOString().split('T')[0];
      return vacationDate === date;
    });

    if (!isVacation) {
      for (let hour = 9; hour < 17; hour++) { // 9 AM to 5 PM
        const startTime = `${hour.toString().padStart(2, '0')}:00:00`;
        const endTime = `${(hour + 1).toString().padStart(2, '0')}:00:00`;

        const isBooked = appointments.some(appointment => {
          const apptDate = new Date(appointment.date).toISOString().split('T')[0];
          const apptStart = appointment.start_time;
          const apptEnd = appointment.end_time;

          return apptDate === date && apptStart === startTime && apptEnd === endTime;
        });

        if (!isBooked) {
          slots.push({
            date,
            start_time: startTime,
            end_time: endTime,
          });
        }
      }
    }
    current.setDate(current.getDate() + 1);
  }

  return slots;
};

module.exports = router;
