const process = require('./process');

module.exports = {
    afficherSalons(req,res,body){
        process.afficherSalon(req,res)
        .then((result)=>{
            res.status(200).json(result)
        })
        .catch((err)=>{
            res.status(400).json(err)
        })
    },

    creerSalon(req,res,body){
        process.creerSalon(req,res,body)
        .then((result)=>{
            //console.log(".then de l action");
            res.status(200).json(result)
        })
         .catch((err)=>{
             res.status(400).json(err)
        })
        // .catch((err)=>{
        //     res.status(409).json(err)
        // })
    },

    rejoindreSalon(req,res,body){
        process.rejoindreSalon(req,res,body)
        .then((result)=>{
            res.status(200).json(result)
        })
        .catch((err)=>{
            res.status(400).json(err);
        })
        .catch((err)=>{
            res.status(409).json(err);
        })
    }

}