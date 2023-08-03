"use strict";

var mongoose = require('mongoose');

var solicitudSchema = mongoose.Schema({
  tipoFinanciamiento: String,
  condicionLaboral: String,
  tipoDeCompra: String,
  seleccionMoneda: String
});
module.exports = mongoose.model('solicitudes', solicitudSchema);
//# sourceMappingURL=solicitudes.dev.js.map
