const process = require('./process');
let user1 = undefined;
let user2 = undefined;

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
            res.status(201).json(result);
        })
         .catch((err)=>{
             res.status(err.CodeHttp).send(err.Erreur)
        })
    },
    miseEnAttente(){
        while(user2 == undefined || user1 == undefined){
            setTimeout(1000);
        }
        console.log('Salon action - deux jouers dans le salon');

    }
    ,


    rejoindreSalon(req,res,body){
        process.rejoindreSalon(req,res,body)
        .then((result)=>{
            console.log('Salon action - code HTTP '+result.CodeHttp);
            console.log('Salon action - objet salon '+result.Salon);
            res.status(result.CodeHttp).json(result.Salon);
        })
        .catch((err)=>{
            console.log('Salon action erreur - code HTTP '+err.CodeHttp);
            res.status(err.CodeHttp).json(err.Erreur);
        })
    }

}