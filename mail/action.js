const process = require('./process');

module.exports = {
    motdepasseoublie: (req,res,body) => {
        process.motdepasseoublie(req,res)
        .then((result) => {
            res.status(result.CodeHttp).json(result.param);
        })
        .catch((err) => {
            res.status(err.CodeHttp).json(err);
        })
    }
}