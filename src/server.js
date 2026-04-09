import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app.js';
import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const { MONGODB_URI, PORT } = process.env;

/**
 * Conexión a MongoDB Atlas:
 * - useNewUrlParser y useUnifiedTopology ya son por defecto en Mongoose 6+
 * - Maneja eventos de conexión para debug.
 */
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('✅ Conectado a MongoDB Atlas');

        app.listen(PORT, () => {
            console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Error conectando a MongoDB:', err.message);
        process.exit(1);
    });