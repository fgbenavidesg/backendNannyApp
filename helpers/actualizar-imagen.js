const { response } = require("express");
const Usuario = require("../models/usuario");
const Medico = require("../models/medico");
const Hospital = require("../models/hospital");
const fs = require("fs"); 


const actualizarImagen = async(tipo,id,nombreArchivo ) =>{

let pathViejo='';

    switch (tipo) {
        case 'foto':

            const usuario =  await Usuario.findByPk(id);
            if(!foto){
                return false;
            }
             pathViejo = `./uploads/foto/${usuario.foto}`;
            if(fs.existsSync(pathViejo)){
                //borrar la imagen
                fs.unlinkSync(pathViejo);
            }

            usuario.foto = nombreArchivo;
            await usuario.save();
            return true;

        break;
        
        // case 'dni':

        //     const usuarioDNI =  await Usuario.findById(id);
        //     if(!hospital){
        //         return false;
        //     }
        //      pathViejo = `./uploads/dni/${usuarioDNI.dni}`;

        //     if(fs.existsSync(pathViejo)){
        //         //borrar la imagen
        //         fs.unlinkSync(pathViejo);
        //     }

        //     hospital.img = nombreArchivo;
        //     await hospital.save();
        //     return true;
                       
        // break;

    }

}

module.exports={
    actualizarImagen
}