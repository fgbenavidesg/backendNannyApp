const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");
const path = require('path');
const fs = require('fs');


const fileUpload =(req, res= response) =>{

    const tipo = req.params.tipo;
    const id = req.params.id;
    
    const tiposValidos = ['foto', 'dni'];
    if (!tiposValidos.includes(tipo)) {

        return res.status(400).json({

            ok: false,
            msg: 'los tipos validos son foto(perfil) o dni(verificación)'

        });
        
    }
    //validar
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg: 'no se encontro archivo'
        });
      }
     //procesar 

     const file = req.files.imagen;
     const nombreCortado = file.name.split('.');
     const extensionArchivo = nombreCortado[nombreCortado.length-1];

     //validar extrension 

     const extensionesValidas = ['png','jpg','jpeg','gif'];
     if(!extensionesValidas.includes(extensionArchivo)){
        return res.status(400).json({
            ok:false,
            msg: 'no es una extension permitida'
        }); 
     }

     //generar el nombre del archivo
     const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;
     
     //path para guardar la imagen
     const path = `./uploads/${tipo}/${nombreArchivo}`; 
     
     //mover la imagen mv()

     file.mv(path, (err)=> {
        if (err){

            return res.status(500).json({
                ok: false,
                msg: 'error al mover la imagen'
            })
        }
        
        //acualizar base de datos
        actualizarImagen(tipo,id,nombreArchivo);
        
        res.json({
            ok: true,
            msg:'archivo subido',
            nombreArchivo
        });
          
    });

}

const retornaImagen = (req, res = response)=>{
    
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg  = path.join(__dirname, `../uploads/${tipo}/${foto}`);
    //imagen por defecto


    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg)
    }else{
        const pathImg  = path.join(__dirname, `../uploads/no-imagen.png`);
        res.sendFile(pathImg)
    }

}

module.exports={
    fileUpload,
    retornaImagen
}