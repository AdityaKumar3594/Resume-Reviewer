const express = require('express');
const authRouter = require('./routes/auth.route');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Middleware to parse cookies
app.use(cookieParser());

// using all routes here
app.use(express.json());

// require all the routes here
app.use('/api/auth', authRouter);


module.exports = app;