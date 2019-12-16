//----Import
const mongoose = require('mongoose');
ObjectId = mongoose.Types.ObjectId;
const bcrypt = require('bcrypt');
const jwtutils = require('./jwt.utils');
const models = require('./model');
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;

//----Router
module.exports = {

    // s'enregistrer
    register: (req, res) => {
        return new Promise((resolve, reject) => {
        models.find({ pseudo: req.body.pseudo }).then(user => {
            if (user.length == 0) {
                bcrypt.hash(req.body.password, 5, function (err, bcryptedPassword) {
                    let newUser = new models({
                        email: req.body.email,
                        pseudo: req.body.pseudo,
                        password: bcryptedPassword,
                        nom: req.body.nom,
                        prenom: req.body.prenom,
                        age: req.body.age,
                        score: 0,
                    })
                    if (req.body.email == null || req.body.pseudo == null || req.body.password == null
                        || req.body.age ==null || req.body.nom ==null || req.body.prenom == null) {
                        reject({ 'Erreur': 'Paramètre manquant','CodeHTTP':400 });
                    }
                    else if (req.body.pseudo.length >= 13 || req.body.pseudo.length <= 4) {
                        reject({ 'Erreur': 'Nombre de caractère pour l\' utilisateur doit etre compris en 5 et 13'
                        ,'CodeHTTP':400 });
                    }
                    else if (!EMAIL_REGEX.test(req.body.email)) {
                        reject({ 'Erreur': 'Email invalide' 
                        ,'CodeHTTP':400});
                    }
                    else if (!PASSWORD_REGEX.test(req.body.password)) {
                        reject({ 'Erreur': 'Mot de passe invalide ! taille doit etre entre 4 et 8 et contenir au moins 1 chiffre'
                        ,'CodeHTTP':400 });
                    }
                    else {
                        newUser.save().then(newUser=>{
                            resolve({'Utilisateur':'Inscris avec succès','CodeHTTP':201})
                        })
                    }
                })
            }
            else {
                reject({ 'Erreur': 'Utilisateur déjà existant','CodeHTTP':400 });
            }


        })
    })},

    //se connecter
    login: (req, res) => {
        return new Promise((resolve, reject) => {
            models.find({ pseudo: req.body.pseudo }).then(user => {
                // si l'user existe
                if (user.length == 1) {
                    bcrypt.compare(req.body.password, user[0].password, function (errBycrypt, resBycrypt) {
                        // est que le mdp est correct
                        if (resBycrypt) {                           
                            resolve( {'token': jwtutils.generateTokenForUser(user[0]),
                        'CodeHTTP':200})
                            // est le mdp est incorrect
                        } else {
                            reject({ 'Erreur': 'Utilisateur ou mot de passe invalide' ,
                        'CodeHTTP':400});                           
                        }
                    })
                    // si l'user n'existe pas     
                } else {
                    reject({ 'Erreur': 'Utilisateur ou mot de passe invalide','CodeHTTP':400 });
            }});
        })
    },
    getuserprofile: (req, res) => {
        return new Promise((resolve, reject) => {
            let headerAuth = req.headers['authorization'];
            let userId = jwtutils.getUserId(headerAuth);
            if (userId < 0) {
                reject({ 'Erreur': 'mauvais token','CodeHTTP':400 });
            }
            else {
                resolve({'Id':userId,
                'CodeHTTP':200});
            }
        })
    }


}
