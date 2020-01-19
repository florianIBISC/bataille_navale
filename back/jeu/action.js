const process = require('./process');

module.exports = {
    initialiser(req,res,body){
        if(req.method != "PUT"){
            res.status(405).json({'Erreur':'Cette ressource n\'est disponible qu\'avec la méthode PUT'});
            return;
        }
        process.initialiser(req,res)
        .then((result)=>{
            res.status(result.CodeHttp);
            let str = "Vos bateaux ont été placé. Ceux de votre adversaire aussi. Vous pouvez attaquer";
            if(result.Resultat == str){
                res.setHeader('Location','/jeu/attaquer');
            }
            else{
                res.setHeader('Location','/jeu/attendre');
            }
            res.json(result.Resultat);
        })
        .catch((err)=>{
            res.status(err.CodeHttp);
            res.json(err.Erreur)
        })

    },
    attaquer(req,res,body){
        if(req.method != "PUT"){
            res.status(405).json({'Erreur':'Cette ressource n\'est disponible qu\'avec la méthode PUT'});
            return;
        }
        process.attaquer(req,res)
        .then((result)=>{
            res.status(result.CodeHttp).json(result.Resultat)
        })
        .catch((err)=>{
            res.status(err.CodeHttp).json(err.Erreur)
        })
    },
    attenteDeJouer(req,res,body){
        if(req.method != "GET"){
            res.status(405).json({'Erreur':'Cette ressource n\'est disponible qu\'avec la méthode GET'});
            return;
        }
        process.attenteTour(req,res)
        .then((result) => {
            res.status(result.CodeHttp).json(result);
        })
        .catch((err) => {
            res.status(err.CodeHttp).json(err.Erreur);
        })
    }
}