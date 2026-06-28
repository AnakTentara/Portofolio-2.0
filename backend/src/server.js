require('dotenv').config();

const express = require('express');
const cors    = require('cors');
const helmet  = require('helmet');
const morgan  = require('morgan');

// Initialise database (runs CREATE TABLE IF NOT EXISTS on startup)
require('./db/database');

// Route modules
const filesRouter     = require('./routes/files');
const downloadsRouter = require('./routes/downloads');
const contactRouter   = require('./routes/contact');

const app  = express();
const PORT = process.env.PORT || 3001;

// ─── Security & Utility Middleware ────────────────────────────────────────────
app.use(helmet());

app.use(cors({
  origin: [
    'https://haikaldev.my.id',
    'http://localhost:5173',
    'http://localhost:3000',
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'HaikalDev Portfolio Backend',
  });
});

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/files',     filesRouter);
app.use('/api/downloads', downloadsRouter);
app.use('/api/contact',   contactRouter);

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('[server] Unhandled error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('');
  console.log('  ╔══════════════════════════════════════════╗');
  console.log(`  ║   🚀  HaikalDev Backend  is  running     ║`);
  console.log(`  ║   http://localhost:${PORT}                  ║`);
  console.log('  ╚══════════════════════════════════════════╝');
  console.log('');
  console.log(`  ENV  : ${process.env.NODE_ENV || 'development'}`);
  console.log(`  PORT : ${PORT}`);
  console.log(`  TIME : ${new Date().toLocaleString()}`);
  console.log('');
});

module.exports = app;
