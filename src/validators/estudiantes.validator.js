import { body, param } from 'express-validator';

/** Validar ID */
export const idValidator = [
    param('id')
        .isMongoId()
        .withMessage('ID no válido'),
];

/** Crear estudiante */
export const createEstudianteValidator = [

    body('matricula')
        .trim()
        .notEmpty()
        .withMessage('La matrícula es obligatoria'),

    body('nombre_completo')
        .trim()
        .notEmpty()
        .withMessage('El nombre completo es obligatorio')
        .isLength({ max: 120 })
        .withMessage('Nombre demasiado largo'),

    body('fecha_nacimiento')
        .notEmpty()
        .withMessage('La fecha de nacimiento es obligatoria')
        .isISO8601()
        .withMessage('Formato de fecha inválido (YYYY-MM-DD)'),

    body('genero')
        .notEmpty()
        .withMessage('El género es obligatorio')
        .isIn(['M', 'F', 'Otro'])
        .withMessage('Género no válido'),

    body('intereses')
        .optional()
        .isArray()
        .withMessage('Intereses debe ser un arreglo'),
];

/** Actualizar estudiante */
export const updateEstudianteValidator = [

    ...idValidator,

    body('matricula')
        .optional()
        .trim(),

    body('nombre_completo')
        .optional()
        .trim()
        .isLength({ max: 120 })
        .withMessage('Nombre demasiado largo'),

    body('fecha_nacimiento')
        .optional()
        .isISO8601()
        .withMessage('Formato de fecha inválido (YYYY-MM-DD)'),

    body('genero')
        .optional()
        .isIn(['M', 'F', 'Otro'])
        .withMessage('Género no válido'),

    body('intereses')
        .optional()
        .isArray()
        .withMessage('Intereses debe ser un arreglo'),
];