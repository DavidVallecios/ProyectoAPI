const Laboratorio = require('../models/laboratorio')
const createError = require('http-errors');

const mostrar = async (req, res) => {
    const registros = await Laboratorio.find()
    res.status(200).json(registros)
}
const mostrarUno = async (req, res, next) => {
    const { id } = req.params;
    const registros = await Laboratorio.findById(id)
    res.status(200).json(registros)
}
const add =  (req, res) => {
    const labs = new Laboratorio(req.body);
    labs.save().then(lab => {
        return res
            .header('Location', '/lab/' + lab._id)
            .status(201)
            .json({
                nombre: lab.nombre
            });
    	})
}
const actualizar = async (req, res) => {
    const { nombre } = req.params;
    await Laboratorio.update({
        nombre: nombre
    }, req.body);
    const labo = await Laboratorio.findOne({nombre: nombre})
    res.status(200).json(labo)
}
const borrar = async (req, res) => {
    const { nombre } = req.params;
    await Laboratorio.findOneAndDelete({nombre: nombre})
    res.status(200).json({})
}


module.exports = {
    mostrar,
    add,
    mostrarUno,
    actualizar,
    borrar
}