const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuariosSchema = new Schema(
    {
        email: 
        {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
        },
        nombre:
        {
            type: String,
            required: 'El nombre es obligatorio',
        },
        password:
        {
            type: String,
            required: 'El password es obligatorio',
        },
    }
);

module.exports = mongoose.model('Usuarios', usuariosSchema);