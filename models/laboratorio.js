const Mongoose = require("mongoose");

const laboratorioSchema = Mongoose.Schema({
    nombre: String,
    capacidad: Number,
    
});

module.exports = Mongoose.model('Lab', laboratorioSchema);