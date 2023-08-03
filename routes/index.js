var express = require('express');
var router = express.Router();
const userSchema = require('../models/user')
const solicitudSchema = require('../models/solicitudes')
const bcrypt = require('bcrypt');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/registro',(req,res)=>{
  res.render('registro');
});


router.get('/perfil',(req,res)=>{
  res.render('perfil');
});

router.get('/solicitarprestamo',(req,res)=>{
  res.render('solicitarprestamo');
});


router.get('/versolicitud',(req,res)=>{
  res.render('versolicitud');
});


router.get('/login',(req,res)=>{
  res.render('login');
});

//metodos
router.post('/registro', async (req, res) => {
  try {        
      const user = new userSchema({
      nombre: req.body.txtNombre,
      apellido: req.body.txtApellido,
      correo: req.body.txtCorreo,
      contraseña: req.body.txtContraseña
      });        
      await user.save();
      console.log('Se agregó un usuario nuevo');
      res.render('index');  
  } catch (error) {
      console.error(error);
      res.status(500).send('Error');
  }
});



router.post('/solicitarprestamo', async (req, res) => {
  try {        
      const user = new solicitudSchema({
        tipoFinanciamiento: req.body.txttipoFinanciamiento,
        condicionLaboral: req.body.txtcondicionLaboral,
        tipoDeCompra: req.body.txttipoDeCompra,
        seleccionMoneda: req.body.txtseleccionMoneda
      });        
      await user.save();
      console.log('Se agregó un usuario nuevo');
      res.render('index');  
  } catch (error) {
      console.error(error);
      res.status(500).send('Error');
  }
});


const User = require('../models/user'); 

router.post('/login', async (req, res) => {
  const { txtCorreo, txtContraseña } = req.body;

  try {
    const usuarioEncontrado = await User.findByEmail(txtCorreo);

    if (!usuarioEncontrado) {
      return res.render('index', { mensaje: 'Correo incorrecto' });
    }

    const esContraseñaCorrecta = await User.findByContra(txtContraseña);;
    if (!esContraseñaCorrecta) {
      return res.render('index', { mensaje: 'Contraseña incorrecta' });
    }

    res.render('perfil', { usuario: usuarioEncontrado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});

router.post('/perfil/editar', async (req, res) => {
  const { txtCorreo, txtContraseña, txtNombre, txtApellido, accion } = req.body;

  try {
    const usuarioEncontrado = await User.findByEmail(txtCorreo);

    if (!usuarioEncontrado) {
      return res.render('index', { mensaje: 'Correo incorrecto' });
    }
    console.log(accion); 
    if (accion === 'actualizar') {
      usuarioEncontrado.nombre = txtNombre;
      usuarioEncontrado.apellido = txtApellido;
      await usuarioEncontrado.save();
      return res.render('perfil', { usuario: usuarioEncontrado, mensaje: 'Datos actualizados correctamente' });
    } else if (accion === 'eliminar') {
      await usuarioEncontrado.deleteOne();
      return res.redirect('/'); 
    }
    res.redirect('/perfil');
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});

module.exports = router;
