const {Router} = require('express');
const { check } = require('express-validator');
const { PadreController } = require('../controllers/padre');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router=Router();

//api/padre
router.post("/",validarJWT,PadreController.create);
router.get("/",validarJWT,PadreController.findAll);
router.get("/:id",validarJWT,PadreController.findOne);
router.put("/:id",validarJWT,PadreController.update);
router.delete("/:id",validarJWT,PadreController.destroy);
module.exports = router;