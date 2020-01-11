//Import
const mongoose = require("mongoose");
const jwutils = require("../utilisateur/jwt.utils");
const modelSalon = require("../salon/model");
const modelUser = require("../utilisateur/model");
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
            let token = req.headers["authorization"];
            let username = jwutils.getUserId(token).pseudo;

            let abscisse = req.body.abscisse;
            //abscisse --;
            let ordonnee = req.body.ordonnee;
            // ordonnee --;

            if( ! (abscisse instanceof Number || ordonnee instanceof Number)){
                reject({'Erreur':'Paramètres erronés','CodeHttp':400});
            }

            if(username == -1 || username == undefined || username == null){
                reject({'Erreur':'Problème avec votre session veuillez vous reconnecter','CodeHttp':400});
            }
            modelSalon.findOne({title: req.body.title,
                $or:[{usernameUtilisateur1: username},{usernameUtilisateur2: username}]},
                function(err,doc){
                    if(err){
                        reject({'Erreur':'Erreur interne veuillez nous excuser pour la gêne occasionnée','CodeHttp':500})
                    }
                    if(username == doc.usernameUtilisateur1){
                        if(doc.plateau1Joueur2[abscisse][ordonnee] != 0){
                            let plateau2Joueur1 = doc.plateau2Joueur1;
                            plateau2Joueur1[abscisse][ordonnee] = 1;
                            let nouveauScore;
                            modelUser.findOne({nom: username},(err,doc) => {
                                nouveauScore = doc.score + 10;
                                modelUser.updateOne({nom: username},{$set: {'score':nouveauScore}});
                            });
                            modelSalon.updateOne({title: req.body.title},{$set: {'plateau1Joueur1':configurationBateau}});
                        }
                    }
                    else if(username == doc.usernameUtilisateur2){}
                
                });
        })
    },
    attenteTour: (req,res) => {
        let token = req.headers["authorization"];
        let username = jwutils.getUserId(token).pseudo;

        modelSalon.findOne({title: req.body.title,
            $or:[{usernameUtilisateur1: username},{usernameUtilisateur2: username}]},
            function(err,doc){
                if(username == doc.usernameUtilisateur1){
                    if(doc.nombreCoupsJoueur1 == nombreCoupsJoueur2){
                        resolve({'CodeHttp':200,'Resultat':'Vous pouvez jouer','Plateau1':
                        doc.plateau1Joueur1, 'Plateau2': doc.plateau2Joueur1});
                    }
                    else{
                        reject({'CodeHttp':409,'Erreur':'Votre adversaire n\'a pas terminé son tour'});
                    }
                }
                if(username == doc.usernameUtilisateur2){
                    if(doc.nombreCoupsJoueur1 == nombreCoupsJoueur2 +1){
                        resolve({'CodeHttp':200,'Resultat':'Vous pouvez jouer','Plateau1':
                        doc.plateau1Joueur1,'Plateau2': doc.plateau2Joueur1});
                    }
                    else{
                        reject({'CodeHttp':409,'Erreur':'Votre adversaire n\'a pas terminé son tour'});
                    }
                }               
            });

    }
    
}