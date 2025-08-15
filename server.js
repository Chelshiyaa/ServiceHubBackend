const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const geminiRouter = require('./routes/gemini');
const servicesRouter = require('./routes/services');
const professionalsRouter = require('./routes/professionals');
const authRouter = require('./routes/auth');
const bookingsRouter = require('./routes/bookings');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/servicehub_db';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => res.json({ ok: true, message: 'ServiceHub API running' }));

app.use('/api/services', servicesRouter);
app.use('/api/professionals', professionalsRouter);
app.use('/api/auth', authRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/gemini', geminiRouter);

// Corrected error handler middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Uncommented and added the correct export statement
module.exports = app;