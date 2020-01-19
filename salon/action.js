const process = require('./process');

module.exports = {


    afficherSalons(req,res,body){
        if(req.method != "GET"){
            res.status(405).json({'Erreur':'Cette ressource n\'est disponible qu\'avec la méthode GET'});
            return;
        }
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
        if(req.method != "POST"){
            res.status(405).json({'Erreur':'Cette ressource n\'est disponible qu\'avec la méthode POST'});
            return;
        }
        process.creerSalon(req,res,body)
        .then((result)=>{
            let codeHttp = result.CodeHttp;
            delete result.CodeHttp;
            res.status(codeHttp);
            res.setHeader('Location','/salon/salonplein');
            res.json(result);
        })
         .catch((err)=>{
             res.status(err.CodeHttp).send(err.Erreur)
        })
    },
    rejoindreSalon(req,res,body){
        if(req.method != "PUT"){
            res.status(405).json({'Erreur':'Cette ressource n\'est disponible qu\'avec la méthode PUT'});
            return;
        }
        process.rejoindreSalon(req,res,body)
        .then((result)=>{
            res.status(result.CodeHttp).json(result.Salon);
        })
        .catch((err)=>{
            res.status(err.CodeHttp).json(err.Erreur);
        })
    },

    salonPlein(req,res,body){
        if(req.method != "GET"){
            res.status(405).json({'Erreur':'Cette ressource n\'est disponible qu\'avec la méthode GET'});
            return;
        }
        process.salonPlein(req,res,body)
        .then((result) => {
            res.status(result.CodeHttp);
            res.setHeader('Location','/jeu/initialiser');
            res.json(result.Message);
        })
        .catch((err) => {
            res.status(err.CodeHttp).json(err.Erreur);
        })
    }
}