const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const courseRoutes = require('./routes/courses');
const progressRoutes = require('./routes/progress');
const analyticsRoutes = require('./routes/analytics');
const utilityRoutes = require('./routes/utilities');
const uploadRoutes = require('./routes/uploads');

// Security middleware
app.use(helmet());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW) * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX), // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Static files
app.use('/uploads', express.static('uploads'));

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('✅ Connected to MongoDB');
})
.catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/utilities', utilityRoutes);
app.use('/api/uploads', uploadRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV
    });
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('public'));
    
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
}

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({
            success: false,
            message: 'Validation Error',
            errors
        });
    }
    
    if (err.name === 'CastError') {
        return res.status(400).json({
            success: false,
            message: 'Invalid ID format'
        });
    }
    
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(400).json({
            success: false,
            message: `${field} already exists`
        });
    }
    
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📚 Smart Education Platform Backend`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
});
