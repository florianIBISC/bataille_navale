const process = require('./process');

module.exports = {

    register(req, res, body) {
        if(req.method != "POST"){
            res.status(405).json({'Erreur':'Cette ressource n\'est disponible qu\'avec la méthode POST'});
            return;
        }
        process.register(req, res, body)
        .then((result) => {
            res.status(result.CodeHTTP);
            res.setHeader('Location','/users/login');
            res.json(result.Utilisateur);
        })
        .catch((err) => {
            res.status(err.CodeHTTP).json(err.Erreur)
        })
    },

    login(req, res) {
        if(req.method != "POST"){
            res.status(405).json({'Erreur':'Cette ressource n\'est disponible qu\'avec la méthode POST'});
            return;
        }
        process.login(req, res)
        .then((result) => {
            res.status(result.CodeHTTP);
            res.setHeader('Location','/salon/affichersalons');
            res.json(result.token);
        })
        .catch((err) => {
            res.status(err.CodeHTTP).json(err.Erreur)
        })
    },
    decrypt(req, res) {
        if(req.method != "GET"){
            res.status(405).json({'Erreur':'Cette ressource n\'est disponible qu\'avec la méthode GET'});
            return;
        }
        process.getuserprofile(req, res)
        .then((result) => {
            res.status(result.CodeHTTP).json(result.Id)
        })
        .catch((err) => {
            res.status(err.CodeHTTP).json(err.Erreur)
        })

    },
    deleteUser(req,res){
        if(req.method != "DELETE"){
            res.status(405).json({'Erreur':'Cette ressource n\'est disponible qu\'avec la méthode DELETE'});
        }
            process.deleteUser(req,res)
            .then((result) => {
                res.status(result.CodeHttp);
                res.setHeader('Location','/users/login');
                res.json();
            })
            .catch((err) => {
                res.status(err.CodeHttp).json(err.Erreur)
            })

    }

}