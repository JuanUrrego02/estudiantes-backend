// src/models/estudiantes.js
import { Schema, model } from 'mongoose';

const estudiantesSchema = new Schema(
{
    matricula: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    nombre_completo: {
        type: String,
        required: true,
        trim: true,
        maxlength: 120
    },

    fecha_nacimiento: {
        type: Date,
        required: true
    },

    genero: {
        type: String,
        required: true,
        enum: ['M', 'F', 'Otro']
    },

    intereses: {
        type: [String], // array de intereses
        default: []
    },
    password: {
        type: String,
        required: true
    }
},
{
    timestamps: true
}
);

export default model('Estudiantes', estudiantesSchema);