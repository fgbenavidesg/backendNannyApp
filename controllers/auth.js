const { Usuario } = require("../models")
const { getMenuFrontEnd }=require('./../helpers/menu-front');
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");
const { verify } = require("../helpers/google-verify");

class authController {

    static async login(req, res) {

        const { email, password } = req.body;
        try {

            const usuarioDB = await Usuario.findOne({ where: { email } });

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
                menu:getMenuFrontEnd(usuarioDB.rol)
                
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'error inesperado... revisar logs'
            })
        }

    }
    static async renewToken(req, res) {

        const id = req.id;
        const token = await generarJWT(id);

        try {
            const usuario = await Usuario.findByPk(id);
            if (!usuario) {
                res.status(404).json({
                    ok: false,
                    msg: 'usuario con id no encontrado'
                });
            }
            res.json({
                ok: true,
                token,
                usuario,
                menu:getMenuFrontEnd(usuario.rol)
            })
        } catch(error) {
            console.log(error)
        }

    }
    static async google(req, res) {

        const googletoken = req.body.token;
        try {
            const { name, email, picture } = await verify(googletoken);

            const usuarioDB = await Usuario.findOne({where: { email } });
            let usuario;

            if (!usuarioDB) {
                usuario = new Usuario({
                    nombre: name,
                    email,
                    password: '@@@',
                    foto: picture,
                    rol:"padre",
                    activo: true,
                });
            } else {
                usuario = usuarioDB;
                usuario.activo = true;
            }

            //guardar en db
            await usuario.save();
            //generar el token - jwt
            const token = await generarJWT(usuario.id)

            res.json({
                ok: true,
                email,name,picture,
                token,
                menu:getMenuFrontEnd(usuario.rol)
            });

        } catch (error) {
            console.log(error)
            res.status(401).json({
                ok: false,
                msg: 'token no es valido'
            })
        }

    }

}

module.exports = {
    authController
}