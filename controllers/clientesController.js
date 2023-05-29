const { json } = require('express');
const Clientes = require('../models/Clientes.js');

// Agrega un nuevo cliente
exports.nuevoCliente = async (req, res, next) =>
{
    const cliente = new Clientes(req.body);

    try 
    {
        // Almacenar el registro
        await cliente.save();
        res.json({mensaje: 'Se agregó un nuevo cliente'});
    } 
    catch (error) 
    {
        // Si hay error, console.log y next
        res.send(error);
        return next();
    }
}

// Muestra todos los clientes
exports.mostrarClientes = async (req, res, next) =>
{
    try 
    {
        const clientes = await Clientes.find({});
        res.json(clientes);
    } 
    catch (error) 
    {
        console.log(error);
        return next();
    }
}

// Muestra un cliente por su ID
exports.mosrtrarCliente = async (req, res, next) =>
{
    const cliente = await Clientes.findById(req.params.idCliente);

    if(!cliente)
    {
        res.json({mensaje: 'Ese cliente no existe'});
        return next();
    }

    // Mostrar el cliente
    res.json(cliente);
}

// Actualiza un cliente por su id
exports.actualizarCliente = async (req, res, next) =>
{
    try 
    {
        const cliente = await Clientes.findByIdAndUpdate({_id: req.params.idCliente}, req.body, {new: true});

        res.json(cliente);
    } 
    catch (error) 
    {
        res.send(error);
        return next();
    }
}

// Elimina un cliente por su id
exports.eliminarCliente = async (req, res, next) =>
{
    try 
    {
        await Clientes.findOneAndDelete({_id: req.params.idCliente});
        res.json({mensaje: 'Cliente eliminado correctamente'});
    } 
    catch (error) 
    {
        console.log(error);
        return next();
    }
}