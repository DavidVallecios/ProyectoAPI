const Mongoose = require("mongoose");
const User = require('./user')
const Lab = require('./laboratorio')

const ReservaSchema = Mongoose.Schema({

  software: String,
  descripcion: String,
  tipo: String,
  laboratorio: {  type: Mongoose.Schema.ObjectId, ref: "Lab"},
  responsable: {  type: Mongoose.Schema.ObjectId, ref: "User"},
  estado: {
    type : String,
    default: 'Confirmada'
  },
  numero_personas: Number,
  creada_por: {  type:  Mongoose.Schema.ObjectId, ref: "User"},
  modificada_por: {  type:  Mongoose.Schema.ObjectId, ref: "User"},
  fecha_inicio : String,
  fecha_fin : String,
  repeticion: {
    tipo_rep: {
      type: String,
      default: "Ninguna"
    },
    dia: Number,
    fecha_tope: String
  }
},{
  timestamps: true
});

module.exports = Mongoose.model("Reserva", ReservaSchema)
