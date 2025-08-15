// routes/bookings.js
const express = require('express');
const Booking = require('../models/Booking');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// POST /api/bookings (protected)
router.post('/', protect, async (req, res, next) => {
  try {
    const { professionalId, service, date } = req.body;
    const booking = new Booking({
      professional: professionalId,
      customer: req.user.id,
      service,
      date
    });
    const saved = await booking.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
});

module.exports = router;