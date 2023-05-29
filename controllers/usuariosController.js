const Usuarios = require('../models/Usuarios.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { json } = require('express');

exports.registrarUsuarios = async (req, res) =>
{
    // Leer los datos de usuarios
    const usuario = new Usuarios(req.body);
    usuario.password = await bcrypt.hash(req.body.password, 12);

    try 
    {
        await usuario.save();
        res.json({mensaje: 'Usuario creado correctamente'});
    } 
    catch (error) 
    {
        console.log(error);
        res.json({mensaje: 'Hubo un error'});    
    }
}

exports.autenticarUsuario = async (req, res, next) =>
{
    const { email, password } =req.body;

    // Buscar el usuario
    const usuario = await Usuarios.findOne({email});

    if(!usuario)
    {
        // Si el usuario no existe
        await res.status(401).json({mensaje: 'El usuario no existe'});
        return next();
    }
    else
    {
        // El usuario existe, verificar el password
        if(!bcrypt.compareSync(password, usuario.password))
        {
            // Si el password es incorrectto
            await res.status(401).json({mensaje: 'Contraseña incorrecta'});
            return next();
        }
        else
        {
            // Password correcto, firmar el token
            const token = jwt.sign(
                {
                    email: usuario.email,
                    nombre: usuario.nombre,
                    _id: usuario._id,
                },
                'palabraSUPERsecreta',
                {
                    expiresIn: '1h',
                }
            );

            // Retornar el token
            res.json({token});
        }
    }
}