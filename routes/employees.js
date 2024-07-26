const express = require('express');
const Employee = require('../models/Employee');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, position, email, phone } = req.body;
    const employee = await Employee.create({ name, position, email, phone });
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Employee.destroy({
        where: { id }
      });
      
      if (result === 0) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  module.exports = router;
