const Reserva = require('../models/reserva')
const User = require('../models/user')
const Lab = require('../models/laboratorio')
const fetch = require('node-fetch')
const sgMail = require('@sendgrid/mail');
const moment = require('moment')

//REGISTRARSE
const registrarse = async (req, res) =>{
    const lab = await Lab.findById(req.body.laboratorio);
    const user = await User.findById(req.body.creada_por);
    var bandera = true;
    const response = await fetch('https://proyecto-web-2019.herokuapp.com/obtener', {
        method: 'GET'
    })
    const responselab = await fetch('https://proyecto-web-2019.herokuapp.com/lab', {
        method: 'GET'
    })
    const registros = await response.json();
    const labs = await responselab.json();

    registros.forEach(element => {
        var lab = element.laboratorio._id
        if(req.body.laboratorio == lab){
            if((moment(req.body.fecha_inicio).isBetween(moment(element.fecha_inicio),moment(element.fecha_fin)))
                || moment(req.body.fecha_inicio).isSame(element.fecha_inicio)){
                    bandera = false;
                return res.status(400).json({mensaje: "Ese horario esta ocupado el laboratorio elegido"})
            }
        }
    });
    labs.forEach(element => {
        if (element._id == req.body.laboratorio && element.capacidad < req.body.numero_personas){
            bandera = false
            return res.status(400).json({mensaje: "La capacidad se ve superada"})
        }
    })

    const registro = new Reserva({
        software: req.body.software,
        descripcion: req.body.descripcion,
        tipo: req.body.tipo,
        laboratorio: req.body.laboratorio,
        numero_personas: req.body.numero_personas,
        creada_por: req.body.creada_por,
        fecha_inicio: req.body.fecha_inicio,
        fecha_fin: req.body.fecha_fin,
        responsable: req.body.responsable,
        repeticion: {
            tipo_rep: req.body.tipo_rep,
            dia: req.body.dia,
            fecha_tope: req.body.fecha_tope
        }
    });
    
    if(bandera){
        correoConfirmar(user.email, lab.nombre);
        correoConfirmarAdmin(lab.nombre);
        await registro.save()
    }  
}

const mostrar = async (req, res) =>{
    const reservas = await Reserva.find()
    .populate({path: 'laboratorio'})
    .exec((err, lab) => {
        if(err){
            //error de conexion a la DB
            res.status(500).send({mensaje: 'Error de la conexion a la BD'})
            //e500.ejs
            //res.send(e500.ejs)
        }else{
            User.populate(lab, {path: 'responsable'}, (err, docingreso) => {
                if(err) {
                    //error con la peticion
                    res.status(502).send({mensaje: 'Error con la peticion'})
                    //e502.ejs
                }else{
                    User.populate(docingreso,{path: 'creada_por'}, (err, final) => {
                        if(err){
                            //F en el chat
                            res.status(500).send({mensaje: 'Error en el chat'})
                            //e500.ejs
                        }else{
                            User.populate(final, {path: 'modificada_por'}, (err, registros) => {
                                if(err){
                                    //error El servicio esta temporalmente no disponible
                                    res.status(503).send({mensaje: 'El servicio esta temporalmente no disponible'})
                                    //e503.ejs
                                }else{
                                    res.status(200).json(registros)
                                }
                            });
                        } 
                    });
                }
            });
        }
    });

    
}

const mostrarxUser = async (req, res) =>{
    const { id } = req.params;
    const usuario_log = await User.findById({_id: id})
    const misReservas = await Reserva.find({creada_por: usuario_log._id})
    res.status(200).json(misReservas);
}

const modificar = async (req, res) =>{
    const { id }  = req.params;
    const usuario_log = await User.findById(req.body.creada_por);
    const lab = await Lab.findById(req.body.laboratorio);
    await Reserva.update({
        _id: id
    }, {
        software: req.body.software,
        descripcion: req.body.descripcion,
        tipo: req.body.tipo,
        estado: req.body.estado,
        laboratorio: req.body.laboratorio,
        numero_personas: req.body.numero_personas,
        creada_por: req.body.creada_por,
        responsable: req.body.responsable,
        modificada_por: req.body.modificada_por,
        fecha_inicio: req.body.fecha_inicio,
        fecha_fin: req.body.fecha_fin,
        repeticion: {
            tipo_rep: req.body.tipo_rep,
            dia: req.body.dia,
            fecha_tope: req.body.fecha_tope
        }
    });
    const reserva = await Reserva.findById(id);
    res.status(200).json(reserva);
    
}

const eliminar = async (req, res) =>{
    const { id } = req.params;
    await Reserva.remove({_id: id});
    res.status(200).json({})
}

const mostrarReserva = async (req, res) => {
    const { id } = req.params;
    const response = await fetch('https://proyecto-web-2019.herokuapp.com/obtener', {
        method: 'GET'
    })
    const registros = await response.json();
    registros.forEach(element => {
        if(element._id == id)
            return res.status(200).json(element)
    });
}

module.exports = {
    registrarse,
    mostrarxUser,
    mostrar,
    modificar,
    mostrarReserva,
    eliminar
}