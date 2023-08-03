"use strict";

var express = require('express');

var router = express.Router();

var userSchema = require('../models/user');

var solicitudSchema = require('../models/solicitudes');

var bcrypt = require('bcrypt');
/* GET home page. */


router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});
router.get('/registro', function (req, res) {
  res.render('registro');
});
router.get('/perfil', function (req, res) {
  res.render('perfil');
});
router.get('/solicitarprestamo', function (req, res) {
  res.render('solicitarprestamo');
});
router.get('/versolicitud', function (req, res) {
  res.render('versolicitud');
});
router.get('/login', function (req, res) {
  res.render('login');
}); //metodos

router.post('/registro', function _callee(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          user = new userSchema({
            nombre: req.body.txtNombre,
            apellido: req.body.txtApellido,
            correo: req.body.txtCorreo,
            contraseña: req.body.txtContraseña
          });
          _context.next = 4;
          return regeneratorRuntime.awrap(user.save());

        case 4:
          console.log('Se agregó un usuario nuevo');
          res.render('index');
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).send('Error');

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
router.post('/solicitarprestamo', function _callee2(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          user = new solicitudSchema({
            tipoFinanciamiento: req.body.txttipoFinanciamiento,
            condicionLaboral: req.body.txtcondicionLaboral,
            tipoDeCompra: req.body.txttipoDeCompra,
            seleccionMoneda: req.body.txtseleccionMoneda
          });
          _context2.next = 4;
          return regeneratorRuntime.awrap(user.save());

        case 4:
          console.log('Se agregó un usuario nuevo');
          res.render('index');
          _context2.next = 12;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          res.status(500).send('Error');

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
});

var User = require('../models/user');

router.post('/login', function _callee3(req, res) {
  var _req$body, txtCorreo, txtContraseña, usuarioEncontrado, esContraseñaCorrecta;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, txtCorreo = _req$body.txtCorreo, txtContraseña = _req$body.txtContraseña;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(User.findByEmail(txtCorreo));

        case 4:
          usuarioEncontrado = _context3.sent;

          if (usuarioEncontrado) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.render('index', {
            mensaje: 'Correo incorrecto'
          }));

        case 7:
          _context3.next = 9;
          return regeneratorRuntime.awrap(User.findByContra(txtContraseña));

        case 9:
          esContraseñaCorrecta = _context3.sent;
          ;

          if (esContraseñaCorrecta) {
            _context3.next = 13;
            break;
          }

          return _context3.abrupt("return", res.render('index', {
            mensaje: 'Contraseña incorrecta'
          }));

        case 13:
          res.render('perfil', {
            usuario: usuarioEncontrado
          });
          _context3.next = 20;
          break;

        case 16:
          _context3.prev = 16;
          _context3.t0 = _context3["catch"](1);
          console.error(_context3.t0);
          res.status(500).json({
            mensaje: 'Error en el servidor'
          });

        case 20:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 16]]);
});
router.post('/perfil/editar', function _callee4(req, res) {
  var _req$body2, txtCorreo, txtContraseña, txtNombre, txtApellido, accion, usuarioEncontrado;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body2 = req.body, txtCorreo = _req$body2.txtCorreo, txtContraseña = _req$body2.txtContraseña, txtNombre = _req$body2.txtNombre, txtApellido = _req$body2.txtApellido, accion = _req$body2.accion;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(User.findByEmail(txtCorreo));

        case 4:
          usuarioEncontrado = _context4.sent;

          if (usuarioEncontrado) {
            _context4.next = 7;
            break;
          }

          return _context4.abrupt("return", res.render('index', {
            mensaje: 'Correo incorrecto'
          }));

        case 7:
          console.log(accion);

          if (!(accion === 'actualizar')) {
            _context4.next = 16;
            break;
          }

          usuarioEncontrado.nombre = txtNombre;
          usuarioEncontrado.apellido = txtApellido;
          _context4.next = 13;
          return regeneratorRuntime.awrap(usuarioEncontrado.save());

        case 13:
          return _context4.abrupt("return", res.render('perfil', {
            usuario: usuarioEncontrado,
            mensaje: 'Datos actualizados correctamente'
          }));

        case 16:
          if (!(accion === 'eliminar')) {
            _context4.next = 20;
            break;
          }

          _context4.next = 19;
          return regeneratorRuntime.awrap(usuarioEncontrado.deleteOne());

        case 19:
          return _context4.abrupt("return", res.redirect('/'));

        case 20:
          res.redirect('/perfil');
          _context4.next = 27;
          break;

        case 23:
          _context4.prev = 23;
          _context4.t0 = _context4["catch"](1);
          console.error(_context4.t0);
          res.status(500).json({
            mensaje: 'Error en el servidor'
          });

        case 27:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 23]]);
});
module.exports = router;
//# sourceMappingURL=index.dev.js.map
