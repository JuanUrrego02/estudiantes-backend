import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/auth.routes.js';
import estudiantesRoutes from './routes/estudiantes.routes.js';

const app = express();

const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174', 'https://frontend-i6ou.vercel.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/estudiantes', estudiantesRoutes); 

app.get('/health', (req, res) => {
    res.json({ ok: true, service: 'estudiantes-api' }); 
});

app.use((err, req, res, next) => {
    console.error('❌ ERROR NO CONTROLADO:', err);
    res.status(500).json({
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

export default app;
