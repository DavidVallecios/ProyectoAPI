const express = require('express')
const router = express.Router();
const reservaController = require('../controllers/reserva')

router.post('/add', reservaController.registrarse)

router.get('/reserva/:id', reservaController.mostrarReserva)

router.put('/modificar/:id', reservaController.modificar)

router.get('/obtener/:id', reservaController.mostrarxUser)

router.get('/obtener', reservaController.mostrar)

router.delete('/delete/:user/:id', reservaController.eliminar)

module.exports = router;