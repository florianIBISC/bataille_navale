const process = require('./process');

module.exports = {
    motdepasseoublie: (req,res,body) => {
        if(req.method != "PUT"){
            res.status(405).json({'Erreur':'Cette ressource n\'est disponible qu\'avec la méthode PUT'});
            return;
        }
        process.motdepasseoublie(req,res)
        .then((result) => {
            res.status(result.CodeHttp);
            res.setHeader('Location','/users/login');
            res.json(result.message);
        })
        .catch((err) => {
            res.status(err.CodeHttp).json(err);
        })
    }
}