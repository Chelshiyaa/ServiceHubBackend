// routes/gemini.js
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
const Service = require('../models/Service'); // Import Service model
const Professional = require('../models/Professional'); // Import Professional model

dotenv.config();
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/ask', async (req, res, next) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    // 1. Fetch data from your database
    const services = await Service.find({});
    const professionals = await Professional.find({});

    // 2. Format the data into a context string
    const serviceList = services.map(s => `Service: ${s.name}, Description: ${s.description}`).join('\n');
    const professionalList = professionals.map(p => `Name: ${p.name}, Profession: ${p.profession}, Rate: ${p.rate}`).join('\n');
    
    const context = `
      You are ServiceHub's AI assistant. Your purpose is to help users find services and professionals available on the platform.
      Here is the data about our services and professionals:
      
      SERVICES:
      ${serviceList}
      
      PROFESSIONALS:
      ${professionalList}
      
      User's Question: ${prompt}
      
      Please answer the user's question using only the information provided above and in a helpful, concise way. If the information isn't available, state that you can't help with that specific query.
    `;

    // Now, send this detailed context as the prompt to the Gemini API
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 
    const result = await model.generateContent(context);
    const response = await result.response;
    const text = response.text();
    
    res.json({ text });
  } catch (error) {
    console.error('Gemini API call failed:', error);
    res.status(500).json({ message: 'Error processing your request with Gemini.' });
  }
});

module.exports = router;