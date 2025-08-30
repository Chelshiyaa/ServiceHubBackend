// routes/bookings.js
const express = require('express');
const Booking = require('../models/Booking');
const Professional = require('../models/Professional'); // Import the Professional model
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// POST /api/bookings (protected)
router.post('/', protect, async (req, res, next) => {
  try {
    const { professionalId, service, date } = req.body;
    const bookingDate = new Date(date);
    const now = new Date();
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(now.getDate() + 7);

    // 1. Validate the date: must be within one week and not in the past.
    if (bookingDate < now || bookingDate > oneWeekFromNow) {
      return res.status(400).json({ message: 'Booking must be within one week from today.' });
    }

    const professional = await Professional.findById(professionalId);
    if (!professional) {
      return res.status(404).json({ message: 'Professional not found' });
    }

    // 2. Check for availability (a simple, exact match for demonstration).
    const isSlotBooked = professional.bookedSlots.some(slot =>
      new Date(slot).getTime() === bookingDate.getTime()
    );

    if (isSlotBooked) {
      return res.status(409).json({ message: 'This time slot is already booked. Please choose another.' });
    }

    // 3. Create the new booking.
    const booking = new Booking({
      professional: professionalId,
      customer: req.user.id,
      service,
      date: bookingDate,
    });
    const saved = await booking.save();

    // 4. Update the professional's booked slots.
    professional.bookedSlots.push(bookingDate);
    await professional.save();

    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
});

module.exports = router;