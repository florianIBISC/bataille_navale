//Import
const mongoose = require("mongoose");
const jwutils = require("../utilisateur/jwt.utils");
const modelSalon = require("../salon/model");
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
    initialiser: (req,res) => {
        return new Promise((resolve,reject) => {
            let token = req.headers["authorization"];
            let username = jwutils.getUserId(token).pseudo;
            console.log('Process jeu - username :'+username);

            if(username == -1 || username == undefined || username == null){
                reject({'Erreur':'Problème avec votre session veuillez vous reconnecter','CodeHttp':400});
            }
            modelSalon.findOne({title: req.body.title,
            $or:[{usernameUtilisateur1: username},{usernameUtilisateur2: username}]},
            function(err,doc){
                if(err){
                    reject({'Erreur':'Erreur interne veuillez nous excuser pour la gêne occasionnée','CodeHttp':500})
                }
                let configurationBateau = null;
                configurationBateau = req.body.bateau;
                if(configurationBateau == null){
                    reject({'Erreur':'Vous n\'avez pas rempli votre grille !','CodeHttp':400})
                }
                else if(username == doc.usernameUtilisateur1){
                    console.log('Vous êtes le user1 - '+doc.usernameUtilisateur1);
                    modelSalon.updateOne({title: req.body.title},{$set: {'plateau1Joueur1':configurationBateau}})
                    .catch(error => {
                        reject({'Erreur':'Erreur interne veuillez nous excuser pour la gêne occasionnée','CodeHttp':500})
                    });
                    resolve({'Init':doc.usernameUtilisateur1,'CodeHttp':200});
                }
                else if(username == doc.usernameUtilisateur2){
                    console.log('Vous êtes le user2 - '+doc.usernameUtilisateur2);
                    modelSalon.updateOne({title: req.body.title},{$set: {'plateau1Joueur1':configurationBateau}})
                    .catch(error => {
                        reject({'Erreur':'Erreur interne veuillez nous excuser pour la gêne occasionnée','CodeHttp':500})
                    });
                    resolve({'Init':doc.usernameUtilisateur2,'CodeHttp':200});
                }
                else{
                    reject({'Erreur':'Erreur interne veuillez nous excuser pour la gêne occasionnée',
                'CodeHttp':500})
                }

            });
        })
    },

    attaquer: (req,res) => {
        return new Promise((resolve,reject) => {
            
        })
    }
    
}