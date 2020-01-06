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
        process.ataquer(req,res)
        .then((result)=>{
            res.status(result.CodeHttp).json(result.json)
        })
        .catch((err)=>{
            res.status(err.CodeHttp).json(err.json)
        })
    }
}