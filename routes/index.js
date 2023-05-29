const express = require('express');
const clientesController = require('../controllers/clientesController.js');
const productosController = require('../controllers/productosController.js');
const pedidosController = require('../controllers/pedidosController.js');
const usuariosController = require('../controllers/usuariosController.js');

//** Middleware para proteger las rutas */
const auth = require('../middleware/auth.js');

const router = express.Router();

module.exports = function()
{
    // Agrega nuevos clientes via POST
    router.post('/clientes', auth, clientesController.nuevoCliente);

    // Obtener todos los clientes
    router.get('/clientes', auth, clientesController.mostrarClientes);

    // Muestra un cliente en especifico
    router.get('/clientes/:idCliente', auth, clientesController.mosrtrarCliente);

    // Actualizar un cliente
    router.put('/clientes/:idCliente', auth, clientesController.actualizarCliente);

    // Eliminar cliente
    router.delete('/clientes/:idCliente', auth, clientesController.eliminarCliente);

    //** PRODUCTOS */

    // Nuevo producto
    router.post('/productos', auth, productosController.subirArchivo, productosController.nuevoProducto);

    // Muestra todos los productos
    router.get('/productos', auth, productosController.mostrarProductos);

    // Muestra un producto por su id
    router.get('/productos/:idProducto', auth, productosController.mostrarProducto);

    // Actualizar productos
    router.put('/productos/:idProducto', auth, productosController.subirArchivo, productosController.actualizarProducto);

    // Eliminar productos
    router.delete('/productos/:idProducto', auth, productosController.eliminarProducto);

    // Busqueda de productos
    router.post('/productos/busqueda/:query', auth, productosController.buscarProducto);

    //** PEDIDOS */
    router.post('/pedidos/nuevo/:idUsuario', auth, pedidosController.nuevoPedido);

    // Agrega nuevos pedidos
    router.get('/pedidos', auth, pedidosController.mostrarPedidos);

    // Mostrar un pedido por su id
    router.get('/pedidos/:idPedido', auth, pedidosController.mostrarPedido);

    // Aatualizar pedido
    router.put('/pedidos/:idPedido', auth, pedidosController.actualizarPedido);

    // Eliminar pedido
    router.delete('/pedidos/:idPedido', auth, pedidosController.eliminarPedido);

    //** USUARIOS */
    router.post('/crear-cuenta', auth, usuariosController.registrarUsuarios);

    router.post('/iniciar-sesion', usuariosController.autenticarUsuario);

    return router;
}