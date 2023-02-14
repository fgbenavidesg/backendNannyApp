const { Usuario } = require("../models");
const fs = require("fs");


const actualizarImagen = async (tipo, id, nombreArchivo) => {

    let pathViejo = '';

    switch (tipo) {
        case 'foto':

            const usuario = await Usuario.findByPk(id)
            if (!usuario) {
                return false;
            }
            pathViejo = `./uploads/foto/${usuario.foto}`;
            if (fs.existsSync(pathViejo)) {
                //borrar la imagen
                fs.unlinkSync(pathViejo);
            }

            usuario.foto = nombreArchivo;
            await usuario.save();
            return true;

            break;

        case 'dni':

            const usuarioDNI = await Usuario.findByPk(id);
            if (!usuarioDNI) {
                return false;
            }
            pathViejo = `./uploads/dni/${usuarioDNI.fotoDni}`;

            if (fs.existsSync(pathViejo)) {
                //borrar la imagen
                fs.unlinkSync(pathViejo);
            }

            usuarioDNI.fotoDni = nombreArchivo;
            await usuarioDNI.save();
            return true;
            break;

    }

}

module.exports = {
    actualizarImagen
}