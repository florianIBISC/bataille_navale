const process = require('./process');
const path = require('path');

module.exports = {
    afficherClassement(req,res,body){
        process.afficherClassement(req,res)
        .then((result)=>{
            res.status(result.CodeHTTP).json(result.Utilisateurs)
        })
        .catch((err)=>{
            res.status(err.CodeHTTP).json(err.Erreur)
        })

    }
}