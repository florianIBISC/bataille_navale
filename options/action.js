const process = require('./process');
const path = require('path');

module.exports = {
    afficherClassement(req,res,body){
        if(req.method != "GET"){
            res.status(405).json({'Erreur':'Cette ressource n\'est disponible qu\'avec la méthode GET'});
            return;
        }
        process.afficherClassement(req,res)
        .then((result)=>{
            res.status(result.CodeHTTP).json(result.Utilisateurs)
        })
        .catch((err)=>{
            res.status(err.CodeHTTP).json(err.Erreur)
        })

    }
}