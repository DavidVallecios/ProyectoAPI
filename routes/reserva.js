const express = require('express')
const router = express.Router();
const reservaController = require('../controllers/reserva')

router.post('/add', reservaController.registrarse)

router.get('/reserva/:user', reservaController.mostrarReserva)

router.put('/modificar/:id', reservaController.modificar)

router.get('/:user', reservaController.mostrarxUser)

router.get('/', reservaController.mostrar)

router.delete('/delete/:id', reservaController.eliminar)

module.exports = router;