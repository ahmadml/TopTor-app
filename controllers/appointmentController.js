
const Appointment = require('../models/Appointment');
const Employee = require('../models/Employee');

exports.createAppointment = async (req, res) => {
  try {
    const { employeeId, clientName, clientEmail, date } = req.body;
    const appointment = new Appointment({ employee: employeeId, clientName, clientEmail, date });
    await appointment.save();

    const employee = await Employee.findById(employeeId);
    employee.appointments.push(appointment);
    await employee.save();

    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('employee');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
