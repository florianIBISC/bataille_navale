const process = require('./process');

module.exports = {
    afficherSalons(req,res,body){
        process.afficherSalon(req,res)
        .then((result)=>{
            res.status(result.CodeHttp).json(result.Salons)
        })
        .catch((err)=>{
            res.status(err.CodeHttp).json(err.Erreur)
        })
    },

    creerSalon(req,res,body){
        process.creerSalon(req,res,body)
        .then((result)=>{
            res.status(201).json(result)
        })
         .catch((err)=>{
             res.status(err.CodeHttp).send(err.Erreur)
        })
    },

    rejoindreSalon(req,res,body){
        process.rejoindreSalon(req,res,body)
        .then((result)=>{
            res.status(200).json(result)
        })
        .catch((err)=>{
            res.status(err.CodeHttp).json(err.Erreur);
        })
    }

}