// models/Professional.js
const mongoose = require('mongoose');

const professionalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  initials: { type: String, required: true },
  profession: { type: String, required: true },
  rate: { type: String, required: true },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  distance: { type: String, default: '0 km' },
  tags: [{ type: String }],
  location: {
    city: { type: String, default: '' },
    area: { type: String, default: '' },
    lat: { type: Number, default: null },
    lng: { type: Number, default: null }
  },
  bookedSlots: [{ type: Date }] // NEW: Stores booked dates and times
}, { timestamps: true });

professionalSchema.index({ 'location.city': 1 });

module.exports = mongoose.model('Professional', professionalSchema);