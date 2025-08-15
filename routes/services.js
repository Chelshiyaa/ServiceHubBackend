// routes/services.js
const express = require('express');
const Service = require('../models/Service');
const router = express.Router();

// GET /api/services
router.get('/', async (req, res, next) => {
  try {
    const services = await Service.find().sort({ name: 1 });
    res.json(services);
  } catch (err) { next(err); }
});

// POST /api/services
router.post('/', async (req, res, next) => {
  try {
    const { name, description, available, iconName } = req.body;
    const service = new Service({ name, description, available, iconName });
    const saved = await service.save();
    res.status(201).json(saved);
  } catch (err) { next(err); }
});

module.exports = router;
