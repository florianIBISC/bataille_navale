let process = require('./process');

module.exports = {
    inscription (req,res,body){
        process.inscription(req,res,body).then((result)=>{
            console.log("Action - Inscription");
            res.status(200).json(result);
        }).catch((error)=>{
            res.status(400).json(error);
        }).catch((error)=>{
            res.status(409).json(error);
        })
    }
}