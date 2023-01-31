const {Usuario} = require("../models");
const fs = require("fs"); 


const actualizarImagen = async(tipo,id,nombreArchivo ) =>{

let pathViejo='';

    switch (tipo) {
        case 'foto':

            const usuario =  await Usuario.findByPk(id)
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