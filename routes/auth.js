const {Router} = require('express');
const { check } = require('express-validator');
const { authController } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');



const router=Router();

//api/auth
router.post("/",[
    check('password','El password es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    validarCampos
],authController.login);


router.post('/google',[
    check('token','El token de google es obligatorio').not().isEmpty(),
    validarCampos,
],authController.google);

router.get("/renew",validarJWT,authController.renewToken)

module.exports = router;