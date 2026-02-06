const path = require('path');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: path.join(__dirname, '.env') });
}
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const profileRoutes = require('./routes/profileRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('API is running...');
});
app.use('/api/profiles', profileRoutes);

// Connect to database and then start server
const startServer = async () => {
    try {
        await connectDB();

        if (process.env.NODE_ENV !== 'production') {
            app.listen(PORT, () => {
                console.log(`Server running on port ${PORT}`);
            });
        }
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

startServer();

module.exports = app;
