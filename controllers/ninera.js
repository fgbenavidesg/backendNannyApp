const {Usuario} = require("../models");
const {Ninera} =require("../models");


class NineraController {

    static create(req, res){
        let data = req.body;
        Ninera.create(data)
        .then((data)=>{
            res.send(data)
        }).catch((err)=>{
            res.status(400).send({
                "message": err.message
            })
        })
    }
    static findAll(req, res){
        Ninera.findAll({
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
        Ninera.findByPk(pk)
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
        Ninera.update(payload, {where:{id:pk}})
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
        Ninera.destroy({where:{id:pk}})
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
    NineraController
}