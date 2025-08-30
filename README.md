🚀 ServiceHub

ServiceHub is a full-stack web application designed to connect users with local service professionals.
Built with the MERN stack, it provides a seamless, modern, and AI-powered experience for finding and contacting trusted experts for various home and business needs.

🌐 Live Demo: service-hub-frontend-git-main-chelshiyas-projects.vercel.app/

✨ Key Features

🔍 Service & Professional Search – Find professionals by service type & location.

🔐 User Authentication – Secure login & signup using JWT.

📞 Direct Contact – "Show Contact" feature to view professional details instantly.

📡 Dynamic Content – Services & professionals fetched from MongoDB in real-time.

🤖 AI Assistant (Gemini AI) – Get intelligent, context-aware answers powered by your database.

🛠️ Tech Stack
Frontend

⚛️ React – Component-based UI

🔗 React Router – Smooth navigation

🎨 Tailwind CSS – Modern & responsive design

⚡ Vite – Blazing fast build tool

📡 Axios – API requests

Backend

🟢 Node.js & Express.js – Scalable server-side framework

🗄️ MongoDB & Mongoose – Flexible NoSQL database

🔑 JWT + bcrypt.js – Secure authentication & password hashing

🤖 @google/generative-ai – AI-powered chatbot

🌱 dotenv – Environment configuration

📂 Installation & Setup

Follow these steps to run ServiceHub locally:

🔧 Backend Setup
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file and add:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key

# Seed database with mock data
node seed.js

# Start backend server
node server.js

🎨 Frontend Setup
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Create .env file and add:
VITE_API_BASE=http://localhost:5000

# Start frontend server
npm run dev

📸 Screenshots

🔹 Homepage

<img width="1890" height="819" alt="image" src="https://github.com/user-attachments/assets/9fba052a-70aa-4219-ba8b-6a1fddf974ad" />


🔹 Popular Services

<img width="1894" height="824" alt="image" src="https://github.com/user-attachments/assets/86463ec6-b035-4dfe-9fd8-6771d180fad2" />


🔹 AI Assistant

<img width="1893" height="827" alt="image" src="https://github.com/user-attachments/assets/9a70437d-368a-482b-8143-f8fd3a8e6a14" />

🔹 Top Rated Professionals

<img width="1897" height="826" alt="image" src="https://github.com/user-attachments/assets/718d5f64-121b-430a-9160-98efa8906af4" />

🔹 How ServiceHub Works
<img width="1893" height="810" alt="image" src="https://github.com/user-attachments/assets/491fcd01-04fc-4b0c-b9c6-2479a94b3048" />


🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to fork the repo and submit a PR.

📬 Contact

💻 GitHub: github.com/Chelshiyaa

🌐 LinkedIn: linkedin.com/in/chelshiya/

📜 License

This project is licensed under the MIT License.

⚡ ServiceHub – Find trusted experts, faster.
