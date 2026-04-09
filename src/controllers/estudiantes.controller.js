import { validationResult } from 'express-validator';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const handleValidation = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return true;
    }
    return false;
};

export const createEstudiante = async (req, res) => {
    try {
        const { matricula, nombre_completo, fecha_nacimiento, genero, password } = req.body;

        if (!password) {
            return res.status(400).json({ message: "Password requerida" });
        }

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            matricula,
            nombre_completo,
            fecha_nacimiento,
            genero,
            password: hashed,
            role: "estudiante"
        });

        res.status(201).json(user);

    } catch (error) {
        console.error("ERROR CREATE:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getEstudiantes = async (req, res) => {
    try {
        const users = await User.find({ role: "estudiante" });

        res.json({
            items: users
        });

    } catch (error) {
        console.error("ERROR GET:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const getEstudianteById = async (req, res) => {
    try {
        if (handleValidation(req, res)) return;

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "Estudiante no encontrado" });
        }

        res.json(user);

    } catch (error) {
        console.error("ERROR GET BY ID:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const updateEstudiante = async (req, res) => {
    try {
        if (handleValidation(req, res)) return;

        const { matricula, nombre_completo, genero, fecha_nacimiento } = req.body;

        const updated = await User.findByIdAndUpdate(
            req.params.id,
            {
                matricula,
                nombre_completo,
                genero,
                fecha_nacimiento
            },
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Estudiante no encontrado" });
        }

        res.json(updated);

    } catch (error) {
        console.error("ERROR UPDATE:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const deleteEstudiante = async (req, res) => {
    try {
        if (handleValidation(req, res)) return;

        const deleted = await User.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Estudiante no encontrado" });
        }

        res.json({ message: "Eliminado correctamente" });

    } catch (error) {
        console.error("ERROR DELETE:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};