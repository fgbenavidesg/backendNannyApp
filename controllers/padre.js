const {Padre} = require("../models");
const {Usuario} = require("../models");

class PadreController {

    static create(req, res){
        let data = req.body;
        Padre.create(data)
        .then((data)=>{
            res.send(data)
        }).catch((err)=>{
            res.status(400).send({
                "message": err.message
            })
        })
    }
    static findAll(req, res){
        Padre.findAll({
            include: {model: Usuario, as: "Usuario"}
        })
        .then((data)=>{
            res.send(data)
            
        }).catch((err)=>{
            res.status(404).send({
                "message": err.message
            })
        })
    }
    static findOne(req,res){
        let pk = req.params.id;
        Padre.findByPk(pk)
        .then((data)=>{
            res.send(data)
        }).catch((err)=>{
            res.status(404).send({
                "message": err.message
            })
        })
    }
    static update(req,res){
        let pk = req.params.id;
        let payload= req.body
        Padre.update(payload, {where:{id:pk}})
        .then((data)=>{
            res.send(data)
        }).catch((err)=>{
            res.status(404).send({
                "message": err.message
            })
        })
    }
    static destroy(req, res){
        let pk =req.params.id
        Padre.destroy({where:{id:pk}})
        .then((data)=>{
            res.status(200).send("DELETED")
        }).catch((err)=>{
            res.status(404).send({
                "message": err.message
            })
        })
    }  
}
module.exports={
    PadreController
}