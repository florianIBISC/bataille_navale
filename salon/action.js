const process = require('./process');

module.exports = {


    afficherSalons(req,res,body){
        process.afficherSalon(req,res)
        .then((result)=>{
            let codeHttp = result.CodeHttp;
            delete result.CodeHttp;
            res.status(codeHttp).json(result);
        })
        .catch((err)=>{
            res.status(err.CodeHttp).json(err.Erreur)
        })
    },

    creerSalon(req,res,body){
        process.creerSalon(req,res,body)
        .then((result)=>{
            let codeHttp = result.CodeHttp;
            delete result.CodeHttp;
            res.status(codeHttp).json(result);
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
            res.status(result.CodeHttp).json(result.Salon);
        })
        .catch((err)=>{
            res.status(err.CodeHttp).json(err.Erreur);
        })
    },

    salonPlein(req,res,body){
        process.salonPlein(req,res,body)
        .then((result) => {
            res.status(result.CodeHttp).json(result.Message);
        })
        .catch((err) => {
            res.status(err.CodeHttp).json(err.Erreur);
        })
    }
}