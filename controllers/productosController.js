const Productos = require('../models/Productos.js');

const multer = require('multer');
const shortid = require('shortid');

const configuracionMulter = 
{
    limits: {fileSize: 1000000},
    storage: fileStorage = multer.diskStorage(
        {
            destination: (req, file, cb) =>
            {
                cb(null, __dirname+'/../uploads/');
            },
            filename: (req, file, cb) =>
            {
                const extension = file.mimetype.split('/')[1];
                cb(null, `${shortid.generate()}.${extension}`);
            }
        }
    ),
    fileFilter(req, file, cb) 
    {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg')
        {
            cb(null, true);
        }
        else
        {
            cb(new Error('Formato no válido'), false);
        }
    }
};

// Pasar la configuracion y el campo
const upload = multer(configuracionMulter).single('imagen');

// Sube un archivo
exports.subirArchivo = (req, res, next) =>
{
    upload(req, res, function(error)
    {
        if(error)
        {
            res.json({mensaje: error});
        }
        return next();
    })
}

// Agrega nuevos productos
exports.nuevoProducto = async (req, res, next) =>
{
    const producto = new Productos(req.body);

    try 
    {
        if(req.file.filename)
        {
            producto.imagen = req.file.filename;
        }

        await producto.save();
        res.json({mensaje: 'Producto agregado correctamente'});
    } 
    catch (error) 
    {
        console.log(error);
        return next();
    }
}

// Muestra todos los productos
exports.mostrarProductos = async (req, res, next) =>
{
    try 
    {
        // Obtener todos los productos
        const productos = await Productos.find({});
        res.json(productos);
    } 
    catch (error) 
    {
        console.log(error);
        return next();
    }
}

// Muetra un producto por su id
exports.mostrarProducto = async (req, res, next) =>
{
    const producto = await Productos.findById(req.params.idProducto);

    if(!producto)
    {
        res.json({mensaje: 'Producto no encontrado'});
        return next();
    }

    // Mostrar el producot
    res.json(producto);
}

// Actualiza un producto via id
exports.actualizarProducto = async (req, res, next) =>
{
    try 
    {   
        // Construir nuevo producto
        let nuevoProducto = req.body;
        
        if(req.file)
        {
            nuevoProducto.imagen = req.file.filename;
        }
        else
        {
            let productoAnterior = await Productos.findById(req.params.idProducto);

            nuevoProducto.imagen = productoAnterior.imagen;
        }

        let producto = await Productos.findByIdAndUpdate({_id: req.params.idProducto}, nuevoProducto, {new: true});
        res.json(producto);
    } 
    catch (error) 
    {
        console.log(error);
        return next();
    }
}

/// Eliminar producto por id
exports.eliminarProducto = async (req, res, next) =>
{
    try 
    {
        await Productos.findOneAndDelete({_id: req.params.idProducto});
        res.json({mensaje: 'El producto se ha eliminado correctamente'});
    } 
    catch (error) 
    {
        console.log(error);
        return next();
    }
};

exports.buscarProducto = async (req, res, next) =>
{
    try 
    {
        // Obtener la busqueda
        const { query } = req.params;

        const productos = await Productos.find({nombre: new RegExp(query, 'i')});
        res.json(productos);
    } 
    catch (error) 
    {
        console.log(error);
        return next();
    }
}