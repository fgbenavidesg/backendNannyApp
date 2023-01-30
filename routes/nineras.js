const {Router} = require('express');
const { check } = require('express-validator');
const { NineraController } = require('../controllers/ninera');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router=Router();

//api/nineras
router.post("/",validarJWT,NineraController.create);
router.get("/",validarJWT,NineraController.findAll);
router.get("/:id",validarJWT,NineraController.findOne);
router.put("/:id",validarJWT,NineraController.update);
router.delete("/:id",validarJWT,NineraController.destroy);
module.exports = router;