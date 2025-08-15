// models/Service.js
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  available: { type: Number, default: 0 }, // store as number; format "120+" on frontend
  iconName: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
