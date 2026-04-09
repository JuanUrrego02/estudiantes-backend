import { Schema, model } from 'mongoose';

/**
* Usuario / Estudiante del sistema
* - matricula: para login
* - password: hash con bcrypt
*/

const userSchema = new Schema(
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
        trim: true
    },

    fecha_nacimiento: {
        type: Date,
        required: true
    },

    genero: {
        type: String,
        enum: ['M', 'F', 'Otro'],
        required: true
    },

    intereses: {
        type: [String],
        default: []
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ['admin', 'estudiante'],
        default: 'estudiante'
    }

},
{ timestamps: true }
);

export default model('User', userSchema);