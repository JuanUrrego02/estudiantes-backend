import { Router } from 'express';

import {
    createEstudiante,
    getEstudiantes,
    getEstudianteById,
    updateEstudiante,
    deleteEstudiante
} from '../controllers/estudiantes.controller.js';

import {
    createEstudianteValidator,
    updateEstudianteValidator,
    idValidator
} from '../validators/estudiantes.validator.js';

import { protect } from '../middleware/auth.middleware.js';

const router = Router();

/**
 * Rutas CRUD:
 * GET    /api/estudiantes
 * POST   /api/estudiantes
 * GET    /api/estudiantes/:id
 * PUT    /api/estudiantes/:id
 * DELETE /api/estudiantes/:id
 */

//
// 🟢 REGISTRO SIN PROTECCIÓN
//
router.post('/', createEstudianteValidator, createEstudiante);

//
// 🔒 A PARTIR DE AQUÍ TODO PROTEGIDO
//
router.use(protect);

// 📄 Listar estudiantes
router.get('/', getEstudiantes);

// 🔍 Obtener estudiante por ID
router.get('/:id', idValidator, getEstudianteById);

// ✏️ Actualizar estudiante
router.put('/:id', idValidator, updateEstudianteValidator, updateEstudiante);

// 🗑️ Eliminar estudiante
router.delete('/:id', idValidator, deleteEstudiante);

export default router;