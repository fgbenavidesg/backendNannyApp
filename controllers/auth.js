const {Usuario} = require("../models")
const bcrypt = require("bcryptjs");

class authController {

    static async login(req, res) {

        const { email, password } = req.body;
        try {

            const usuarioDB = await Usuario.findOne({where: {email} });

            if (!usuarioDB) {
                return res.status(404).json({
                    ok: false,
                    msg: 'email no encontrado'
                })
            }
            //verificar contraseña
            const validPassword = bcrypt.compareSync(password, usuarioDB.password);
            if (!validPassword) {
                return res.status(404).json({
                    ok: false,
                    msg: 'contraseña no valida'
                })
            }
            //generar token

            const token = await generarJWT(usuarioDB.id);

            res.json({
                ok: true,
                token,
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'error inesperado... revisar logs'
            })
        }

    }
    static async renewToken(req, res){

        const id = req.id;
        const token = await generarJWT(id);
    
        try {
            const usuario = await Usuario.findByPk(id);
            if (!usuario) {
                res.status(404).json({
                    ok:false,
                    msg:'usuario con id no encontrado'
                });
            }
            res.json({
                ok: true,
                token,
                usuario,
            })
    
        } catch (error) {
            console.log(error)
            res.status(401).json({
                ok: false,
                msg: 'consultar con el administrador'
            })
        }
    
    }

}

module.exports = {
    authController
}