const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({

    nombre: String,
    apellido: String,
    correo: String,
    contraseña: String
});


// Método para buscar un usuario por su correo
userSchema.statics.findByEmail = async function (correo) {
    return this.findOne({ correo });
  };


userSchema.statics.findByContra = async function (contraseña) {
    return this.findOne({ contraseña });
};

 
const userModel = mongoose.model('users', userSchema);

module.exports = userModel;