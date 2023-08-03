"use strict";

var mongoose = require('mongoose');

var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
  nombre: String,
  apellido: String,
  correo: String,
  contraseña: String
}); // Método para buscar un usuario por su correo

userSchema.statics.findByEmail = function _callee(correo) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", this.findOne({
            correo: correo
          }));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
};

userSchema.statics.findByContra = function _callee2(contraseña) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", this.findOne({
            contraseña: contraseña
          }));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  }, null, this);
};

var userModel = mongoose.model('users', userSchema);
module.exports = userModel;
//# sourceMappingURL=user.dev.js.map
