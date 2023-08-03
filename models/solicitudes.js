const mongoose = require('mongoose');

const solicitudSchema = mongoose.Schema({

    tipoFinanciamiento: String,
    condicionLaboral: String,
    tipoDeCompra: String,
    seleccionMoneda: String
});

module.exports = mongoose.model('solicitudes',solicitudSchema);