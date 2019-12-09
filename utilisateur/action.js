const process = require('./process');

module.exports = {

    register(req, res, body) {
        process.register(req, res, body)
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
    },

    login(req, res) {
        process.login(req, res)
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
        .catch((err) => {
            res.status(403).json(err)
        })
        
    },
    decrypt(req, res) {
        process.getuserprofile(req, res)
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => {
            res.status(400).json(err)
        })

    }

}