require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const profileRoutes = require('./routes/profileRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
// Global CORS Configuration - Allows all origins
app.use(cors());
app.use(express.json());

// Routes
app.use('/', profileRoutes);

// Move the base check to another path or keep it if it doesn't conflict
// app.get('/', (req, res) => {
//     res.send('API is running...');
// });

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
