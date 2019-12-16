const process = require('./process');

module.exports = {

    register(req, res, body) {
        process.register(req, res, body)
        .then((result) => {
            res.status(result.CodeHTTP).json(result.Utilisateur)
        })
        .catch((err) => {
            res.status(err.CodeHTTP).json(err.Erreur)
        })
    },

    login(req, res) {
        process.login(req, res)
        .then((result) => {
            res.status(result.CodeHTTP).json(result.token)
        })
        .catch((err) => {
            res.status(err.CodeHTTP).json(err.Erreur)
        })
    },
    decrypt(req, res) {
        process.getuserprofile(req, res)
        .then((result) => {
            res.status(result.CodeHTTP).json(result.Id)
        })
        .catch((err) => {
            res.status(err.CodeHTTP).json(err.Erreur)
        })

    }

}