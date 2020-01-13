const process = require('./process');

module.exports = {
    initialiser(req,res,body){
        process.initialiser(req,res)
        .then((result)=>{
            res.status(result.CodeHttp).json(result.Init)
        })
        .catch((err)=>{
            res.status(err.CodeHttp).json(err.Erreur)
        })

    },
    attaquer(req,res,body){
        process.attaquer(req,res)
        .then((result)=>{
            res.status(result.CodeHttp).json(result.Resultat)
        })
        .catch((err)=>{
            res.status(err.CodeHttp).json(err.Erreur)
        })
    },
    attenteDeJouer(req,res,body){
        process.attenteTour(req,res)
        .then((result) => {
            res.status(result.CodeHttp).json(result);
        })
        .catch((err) => {
            res.status(err.CodeHttp).json(err.Erreur);
        })
    }
}