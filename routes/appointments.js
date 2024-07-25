const express = require('express');
const Appointment = require('../models/Appointment');
const Client = require('../models/Client');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { employee_id, client_name, client_email, date, start_time, end_time } = req.body;

    let client = await Client.findOne({ where: { email: client_email } });
    if (!client) {
      client = await Client.create({ name: client_name, email: client_email });
    }

    const appointment = await Appointment.create({ 
      employee_id, 
      client_id: client.id, 
      date, 
      start_time, 
      end_time 
    });

    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.findAll({ include: Client });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const appointment = await Appointment.findByPk(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    await appointment.destroy();
    res.status(200).json({ message: 'Appointment canceled successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
