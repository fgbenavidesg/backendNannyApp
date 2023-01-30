const  {Usuario}  = require("../models");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

class UsuarioController {

    static async create(req, res) {

       let {email,password} = req.body;

       try {
           const existeEmail = await Usuario.findOne({where: {email}  });
           if (existeEmail) {
               return res.status(400).json({
                ok: false,
                msg: 'el correo ya esta registrado'
            })
           }
           const usuario = new Usuario(req.body);
   
           const salt = bcrypt.genSaltSync();
   
           usuario.password = bcrypt.hashSync(password, salt);
   
           await usuario.save();
   
           //generar token
           const token = await generarJWT(usuario.uid);   
   
           res.json({
               ok: true,
               usuario,
               token
           });
   
   
       } catch (error) {
           console.log(error);
           res.status(500).json({
               ok: false,
               msg: 'error inesperado... revisar logs'
           })
       }

    }
    static findAll(req, res) {
        Usuario.findAll()
            .then((data) => {
                res.send(data)
            }).catch((err) => {
                res.status(404).send({
                    "message": err.message
                })
            })
    }
    static findOne(req, res) {
        let pk = req.params.id;
        Usuario.findByPk(pk)
            .then((data) => {
                res.send(data)
            }).catch((err) => {
                res.status(404).send({
                    "message": err.message
                })
            })
    }
    static update(req, res) {
        let pk = req.params.id;
        let payload = req.body
        Usuario.update(payload, { where: { id: pk } })
            .then((data) => {
                res.send(data)
            }).catch((err) => {
                res.status(404).send({
                    "message": err.message
                })
            })
    }
    static destroy(req, res) {
        let pk = req.params.id
        Usuario.destroy({ where: { id: pk } })
            .then((data) => {
                res.status(200).send("DELETED")
            }).catch((err) => {
                res.status(404).send({
                    "message": err.message
                })
            })
    }


}
module.exports = {
    UsuarioController
}