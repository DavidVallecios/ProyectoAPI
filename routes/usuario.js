
const express = require('express')
const router = express.Router();
const usuarioController = require('../controllers/usuario')

//verificar que sean validos los datos al registrarse
router.post('/signup', usuarioController.crear)

//actualizar el rol del usuario
router.put('/edit/:id', usuarioController.modificar)

//mostrar todos los usuarios
router.get('/users/:id', usuarioController.mostrar)

//mostrar un usuario
router.get('/users/:user', usuarioController.mostrarUno)

//borrar un usuario
router.delete('/users/:user', usuarioController.borrar)

module.exports = router

    


