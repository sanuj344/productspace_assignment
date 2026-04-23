require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const globalErrorHandler = require('./middleware/errorHandler');
const AppError = require('./utils/AppError');

const app = express();

// ─── CORS ──────────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// ─── Body Parsers ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ──────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.all('*', (req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found on this server.`, 404));
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use(globalErrorHandler);

module.exports = app;
