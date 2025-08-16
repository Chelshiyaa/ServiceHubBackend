// backend/routes/professionals.js
const express = require('express');
const Professional = require('../models/Professional');
const router = express.Router();

// Utility: haversine distance (km)
function haversine(lat1, lon1, lat2, lon2) {
  function toRad(v){ return (v * Math.PI) / 180; }
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon/2)**2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// GET /api/professionals?city=Delhi OR ?near=28.61,77.20&radiusKm=5
router.get('/', async (req, res, next) => {
  try {
    const { city, near, radiusKm } = req.query;
    let query = {}; // Create an empty query object for Mongoose

    // Add city filter to the query object for more efficient searching
    if (city) {
      query['location.city'] = { $regex: new RegExp(city.trim(), 'i') };
    }
    
    // Use the query object to find professionals directly in the database
    let professionals = await Professional.find(query);
    
    // Haversine distance filtering is still done in memory after the initial query
    if (near) {
      const [latStr, lngStr] = near.split(',');
      const lat = parseFloat(latStr);
      const lng = parseFloat(lngStr);
      const radius = parseFloat(radiusKm || '5');
      if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
        professionals = professionals.filter(p => {
          const plat = p.location?.lat;
          const plng = p.location?.lng;
          if (plat == null || plng == null) return false;
          return haversine(lat, lng, plat, plng) <= radius;
        });
      }
    }
    
    res.json(professionals);
  } catch (err) { next(err); }
});

// POST /api/professionals
router.post('/', async (req, res, next) => {
  try {
    const { name, initials, profession, rate, rating, reviews, distance, tags, location } = req.body;
    const pro = new Professional({ name, initials, profession, rate, rating, reviews, distance, tags, location });
    const saved = await pro.save();
    res.status(201).json(saved);
  } catch (err) { next(err); }
});

module.exports = router;