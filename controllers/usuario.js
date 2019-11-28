const User = require('../models/user')

//MODIFICAR
const modificar = async (req, res) => {
    const { user } = req.params;
    await User.update({
        username: user
    }, req.body);
    const usuario = await User.findOne({username: user})
    res.status(200).json(usuario)
}
const mostrar = async (req, res) => {
    const usuarios = await User.find()
    res.status(200).json(usuarios);
}

const mostrarUno = async (req, res) => {
    const { user } = req.params;
    const usuario = await User.findOne({username: user});
    res.status(200).json(usuario)
}
const borrar = async (req, res) => {
    const { user } = req.params;
    await User.findOneAndDelete({username: user})
    res.status(200).json({})
}
const crear = (req, res, next) => {
    User.findOne({
        username: req.body.username
    })
    .then((foundUser) => {
        if(foundUser){
            return res.status(400).json({})
        }else{
            let newUser = new User({
                username: req.body.username,
                nombre: req.body.nombre || "",
                rol : req.body.rol || "invitado",
                email: req.body.email,
                password : ""
            });
            newUser.password = newUser.generateHash(req.body.password)
            return newUser.save();
        }
    }).then(user => {
        return res
            .header('Location', '/users/'+ user._id)
            .status(201)
            .json({
                username: user.username,
            });
    }).catch(err => {
        next(err);
    });
}

module.exports = {
    modificar,
    mostrar,
    mostrarUno,
    borrar,
    crear
}