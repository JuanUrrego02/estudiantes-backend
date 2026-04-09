// src/controllers/auth.controller.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

/**
 * POST /api/auth/login
 * Autentica estudiante y devuelve JWT
 */

export const login = async (req, res) => {
    try {
        const { matricula, password } = req.body;

        if (!matricula || !password) {
            return res.status(400).json({ message: 'Faltan credenciales' });
        }

        const user = await User.findOne({ matricula });

        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '4h'
            }
        );

        // 📦 Respuesta
        res.json({
            message: 'Login exitoso',
            token,
            user: {
                id: user._id,
                matricula: user.matricula,
                nombre: user.nombre_completo,
                role: user.role
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

/**
 * POST /api/auth/register
 * Crea un usuario y devuelve JWT
 */
export const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Correo y contrasena son obligatorios' });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(409).json({ message: 'Ese correo ya esta registrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email: normalizedEmail,
            password: hashedPassword,
            role: 'user'
        });

        res.status(201).json(buildAuthResponse(user));

    } catch (err) {
        next(err);
    }
};