const express = require('express');
const Client = require('../models/Client');
const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const client = await Client.create({ name, email, phone });
    res.status(201).json(client);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/exists/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const client = await Client.findByPk(id);
  
      if (client) {
        res.json({ exists: true, client });
      } else {
        res.json({ exists: false });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    await client.destroy();
    res.status(204).json({ message: 'Client deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
