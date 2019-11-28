const Mongoose = require("mongoose");
const bcrypt = require('bcrypt-nodejs')

const usuarioSchema = Mongoose.Schema({
    nombre: String,
    username: String,
    email: String,
    password: String,
    rol: {
        type: String,
        default: 'invitado'
    }
});

//cifrar contraseña para almacenarla
usuarioSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//verificando si la contraseña ingresada es correcta
usuarioSchema.methods.validatePassword = function (password){
    return bcrypt.compareSync(password, this.password)
}

module.exports = Mongoose.model('usuario', usuarioSchema);


