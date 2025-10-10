import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import pool from './db/connection.js';

import conversationsRouter from './routes/conversations.js';
import analyticsRouter from './routes/analytics.js';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*' }));
app.use(express.json({ limit: '1mb' }));

// Health check
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// Routes
app.use('/api/v1/conversations', conversationsRouter);
app.use('/api/v1/analytics', analyticsRouter);

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = Number(process.env.PORT || 3001);

const start = async () => {
    try {
        await pool.query('SELECT NOW()');
        console.log('PostgreSQL connected');
        app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
    } catch (e) {
        console.error('Failed to start server', e);
        process.exit(1);
    }
};

start();


