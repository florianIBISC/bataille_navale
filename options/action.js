const process = require('./process');

module.exports = {
    afficherClassement(req,res,body){
        process.afficherClassement(req,res)
        .then((result)=>{
            res.status(200).json(result)
        })
        .catch((err)=>{
            res.status(400).json(err)
        })

    }
}