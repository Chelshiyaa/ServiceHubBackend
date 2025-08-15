// seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('./models/Service');
const Professional = require('./models/Professional');

dotenv.config();

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/servicehub_db';

async function run() {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB for seeding');

    await Service.deleteMany({});
    await Professional.deleteMany({});

    const servicesData = [
      { name: 'Plumbing', description: 'Repairs, installations, emergency fixes', available: 120, iconName: 'WrenchIcon' },
      { name: 'Electrical', description: 'Wiring, repairs, installations', available: 85, iconName: 'BoltIcon' },
      { name: 'Carpentry', description: 'Furniture, repairs, custom work', available: 95, iconName: 'HammerIcon' },
      { name: 'Cleaning', description: 'Home, office, deep cleaning', available: 200, iconName: 'SparklesIcon' },
      { name: 'Painting', description: 'Interior, exterior, touch-ups', available: 60, iconName: 'BrushIcon' },
      { name: 'Auto Repair', description: 'Mechanics, detailing, maintenance', available: 150, iconName: 'CarIcon' },
      { name: 'Gardening', description: 'Landscaping, maintenance, design', available: 45, iconName: 'TreePineIcon' },
      { name: 'Security', description: 'Installation, monitoring, repair', available: 30, iconName: 'ShieldCheckIcon' },
    ];

    const professionalsData = [
      {
        name: 'John Martinez', initials: 'JM', profession: 'Master Plumber', rate: '$75/hr', rating: 4.9, reviews: 127, distance: '0.8 km',
        tags: ['Emergency Repairs', 'Pipe Installation', 'Leak Detection'],
        location: { city: 'Delhi', area: 'Connaught Place', lat: 28.6315, lng: 77.2167 }
      },
      {
        name: 'Sarah Chen', initials: 'SC', profession: 'Licensed Electrician', rate: '$80/hr', rating: 4.8, reviews: 89, distance: '1.2 km',
        tags: ['Wiring', 'Panel Upgrades', 'Smart Home'],
        location: { city: 'Gurugram', area: 'DLF Phase 3', lat: 28.4946, lng: 77.0880 }
      },
      {
        name: 'Mike Thompson', initials: 'MT', profession: 'Master Carpenter', rate: '$65/hr', rating: 4.9, reviews: 156, distance: '2.1 km',
        tags: ['Custom Furniture', 'Deck Building'],
        location: { city: 'Noida', area: 'Sector 18', lat: 28.5692, lng: 77.3250 }
      },
      {
        name: 'Lisa Rodriguez', initials: 'LR', profession: 'Professional Cleaner', rate: '$45/hr', rating: 5.0, reviews: 203, distance: '1.5 km',
        tags: ['Deep Cleaning', 'Office Cleaning'],
        location: { city: 'Delhi', area: 'Hauz Khas', lat: 28.5494, lng: 77.2001 }
      },
    ];

    await Service.insertMany(servicesData);
    await Professional.insertMany(professionalsData);

    console.log('Dummy data seeded successfully!');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

run();
