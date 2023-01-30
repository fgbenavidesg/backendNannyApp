const {Router} = require('express');
const { check } = require('express-validator');
const { UsuarioController } = require('../controllers/usuario');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router=Router();


//api/usuario
router.post("/",[
    check('password','El password es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('dni','el DNI es obligatorio').not().isEmpty(),
    validarCampos
],UsuarioController.create);

router.get("/",validarJWT,UsuarioController.findAll);

router.get(":id",validarJWT,UsuarioController.findOne);

router.put(":id",validarJWT,UsuarioController.update);

router.delete("/:id",validarJWT,UsuarioController.destroy);
module.exports = router;