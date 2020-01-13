//Import
const mongoose = require("mongoose");
const jwutils = require("../utilisateur/jwt.utils");
const modelSalon = require("../salon/model");
const modelUser = require("../utilisateur/model");
const convertisseur = require("../ressource/convertisseurLettreEnChiffre");
const ObjectId = mongoose.Types.ObjectId;
const nbrTotalDeCase = 10;

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
            console.log('Process attaquer - début de la méthode');
            let token = req.headers["authorization"];
            let username = jwutils.getUserId(token).pseudo;
            if(username == -1 || username == undefined || username == null){
                reject({'Erreur':'Problème avec votre session veuillez vous reconnecter','CodeHttp':400});
            }


            else{
            console.log('Process attaquer - req.body.coordonnee : '+ req.body.coordonnee);
            let coordonnee = req.body.coordonnee;
            let coordonneeLettreChiffre = coordonnee;
            console.log('Process attaquer - après affectation à la var coordonnee');
            coordonnee = mappingCoordonnee(coordonnee);
            console.log('Process attaquer - après la fct de mappingCoordonnées');
            console.log('Process attaquer - coordonneeLettreChiffre : '+coordonneeLettreChiffre);
            console.log('Process attaquer - Mapping coordonnee.abscisse : '+ coordonnee.abscisse + '\tcoordonnee.ordonnee : '+coordonnee.ordonnee);


            if(coordonnee.abscisse == "error"){
                console.log('Process attaquer - coordonnee.abscisse == error');
                reject({'Erreur':'Coordonnées erronées','CodeHttp':400});
            }

            let abscisse = coordonnee.abscisse;
            let ordonnee = coordonnee.ordonnee;

            if(username == -1 || username == undefined || username == null){
                reject({'Erreur':'Problème avec votre session veuillez vous reconnecter','CodeHttp':400});
            }
            modelSalon.findOne({title: req.body.title,
                $or:[{usernameUtilisateur1: username},{usernameUtilisateur2: username}]},
                function(err,doc){
                    if(err){
                        reject({'Erreur':'Erreur interne veuillez nous excuser pour la gêne occasionnée','CodeHttp':500})
                    }
                    console.log('Process attaquer - début de modelSalon.findOne');
                    //joueur 1 attaque
                    if(username == doc.usernameUtilisateur1){
                        console.log('Process attaquer - le joueur 1 attaque - doc.usernameUtilisateur1 = '+doc.usernameUtilisateur1);
                        //il touche le joueur 2
                        if(doc.plateau1Joueur2[abscisse][ordonnee] > 0){
                            let plateau2Joueur1 = doc.plateau2Joueur1;
                            plateau2Joueur1[abscisse][ordonnee] = -2;
                            let nouveauScore;
                            let nombreCoupsJoueur1 = doc.nombreCoupsJoueur1 + 1;
                            let dernierCoup = doc.dernierCoupsJouesJoueur1;
                            dernierCoup.push(coordonneeLettreChiffre);

                            modelUser.findOne({nom: username},(err,doc) => {
                                nouveauScore = doc.score + 10;
                                modelUser.updateOne({nom: username},{$set: {'score':nouveauScore}});
                            });
                            modelSalon.updateOne({title: req.body.title},{$set: {'plateau2Joueur1':plateau2Joueur1,'nombreCoupsJoueur1':nombreCoupsJoueur1, 'dernierCoupsJouesJoueur1':dernierCoup}},
                            (err,doc) => {
                                if(err){
                                    reject({'Erreur':'Erreur interne veuillez nous excuser pour la gêne occasionnée','CodeHttp':500})
                                }
                            });
                            let nbrCasesAdversesNonTouches = nbrDeCasesDeBateauEnVieDeLAutreJoueur(req.body.title,username,new Boolean("true"));
                            console.log('Process attaquer - nbrCasesAdversesNonTouches = '+nbrCasesAdversesNonTouches);

                            if(nbrTotalDeCase - nbrCasesAdversesNonTouches <1 ){
                                resolve({'CodeHttp':200,'Resultat': 'Vous avez gagné la partie. Félicitation','PlateauJoueurAdverse':plateau2Joueur1})
                            }

                            resolve({'CodeHttp':200,'Resultat': 'Touché','PlateauJoueurAdverse':plateau2Joueur1})
                        }
                        //tir dans l'eau
                        else if(doc.plateau1Joueur2[abscisse][ordonnee] == 0){
                            let plateau2Joueur1 = doc.plateau2Joueur1;
                            plateau2Joueur1[abscisse][ordonnee] = -1;
                            modelSalon.updateOne({title: req.body.title},{$set: {'plateau2Joueur1':plateau2Joueur1,'nombreCoupsJoueur1':nombreCoupsJoueur1}},
                            (err,doc) => {
                                if(err){
                                    reject({'Erreur':'Erreur interne veuillez nous excuser pour la gêne occasionnée','CodeHttp':500})
                                }
                            });
                            resolve({'CodeHttp':200,'Resultat': 'Loupé','PlateauJoueurAdverse':plateau2Joueur1})
                        }
                        else{
                            reject({'Erreur':'Vous avez déjà tiré à l\'endroit spécifié. Veuillez réessayer ailleurs','CodeHttp':400})
                        }
                    }
                    //Le joueur 2 attaque
                    else if(username == doc.usernameUtilisateur2){
                        console.log('Process attaquer - le joueur 2 attaque');
                        //Il touche le joueur 1
                        if(doc.plateau1Joueur1[abscisse][ordonnee] > 0){
                            //console.log('Process attaquer - doc.plateau1Joueur1[abscisse][ordonnee] : '+doc.plateau1Joueur1[abscisse][ordonnee]);
                            let plateau2Joueur2 = doc.plateau2Joueur2;
                            plateau2Joueur2[abscisse][ordonnee] = doc.plateau1Joueur1[abscisse][ordonnee] * -1;
                            //console.log('Process attaquer - plateau2Joueur2[abscisse][ordonnee] : '+plateau2Joueur2[abscisse][ordonnee]);
                            let nouveauScore;
                            let nombreCoupsJoueur2 = doc.nombreCoupsJoueur2 + 1;
                            console.log('Process attaquer - plateau2Joueur2 : '+plateau2Joueur2);

                            modelUser.findOne({prenom: username},
                                function(err,doc){
                                    console.log('Process attaquer - trouver un user prenom : '+doc.prenom);
                                    nouveauScore = doc.score + 10;
                                    //console.log('Process attaquer - score : '+doc.score+' - nouveauScore : '+nouveauScore);

                                    modelUser.updateOne({prenom: username},{$set: {score:nouveauScore}});

                                });                            

                            modelSalon.updateOne({title: req.body.title},{$set: {'plateau2Joueur2':plateau2Joueur2,'nombreCoupsJoueur2':nombreCoupsJoueur2}},
                            (err,doc) => {
                                if(err){
                                    reject({'Erreur':'Erreur interne veuillez nous excuser pour la gêne occasionnée','CodeHttp':500})
                                }
                                console.log('Process attaquer - modelSalon.updateOne fin : ');

                            });
                            /*let nbrCasesAdversesNonTouches = nbrDeCasesDeBateauEnVieDeLAutreJoueur(req.body.title,username,false);
                            setTimeout(() => {},1000);
                            console.log('Process attaquer - nbrCasesAdversesNonTouches : '+nbrCasesAdversesNonTouches);

                            if(nbrTotalDeCase - nbrCasesAdversesNonTouches == 0 ){
                                resolve({'CodeHttp':200,'Resultat': 'Vous avez gagné la partie. Félicitation','PlateauJoueurAdverse':plateau2Joueur2})
                            }
                            else{
                                resolve({'CodeHttp':200,'Resultat': 'Touché','PlateauJoueurAdverse':plateau2Joueur2,'nombreCoupsJoueur2':nombreCoupsJoueur2})
                            }*/
                            nbrDeCasesDeBateauEnVieDeLAutreJoueur(req.body.title,username,false).then(nbr => {
                                console.log('Process attaquer - nbrCasesAdversesNonTouches : '+nbr.count);
                            })
                        }
                        //tir dans l'eau
                        else if(doc.plateau1Joueur1[abscisse][ordonnee] == 0){
                            let plateau2Joueur2 = doc.plateau2Joueur2;
                            plateau2Joueur2[abscisse][ordonnee] = -1;
                            modelSalon.updateOne({title: req.body.title},{$set: {'plateau2Joueur2':plateau2Joueur2}},
                            (err,doc) => {
                                if(err){
                                    reject({'Erreur':'Erreur interne veuillez nous excuser pour la gêne occasionnée','CodeHttp':500})
                                }
                            });
                            resolve({'CodeHttp':200,'Resultat': 'Loupé','PlateauJoueurAdverse':plateau2Joueur2})
                        }
                        else{
                            reject({'Erreur':'Vous avez déjà tiré à l\'endroit spécifié. Veuillez réessayer ailleurs','CodeHttp':400})
                        }                                              
                    }
                
                });
        }
    })
},
    attenteTour: (req,res) => {
        return new Promise((resolve,reject) => {
            console.log('attenteTour - début de la méthode');
            let token = req.headers["authorization"];
            let username = jwutils.getUserId(token).pseudo;

            if(username == -1 || username == undefined || username == null){
                reject({'Erreur':'Problème avec votre session veuillez vous reconnecter','CodeHttp':400});
            }

            modelSalon.findOne({title: req.body.title,
                $or:[{usernameUtilisateur1: username},{usernameUtilisateur2: username}]},
                function(err,doc){
                    console.log('attenteTour - modelSalon.findOne début');
                    if(username == doc.usernameUtilisateur1){
                        if(doc.nombreCoupsJoueur1 == doc.nombreCoupsJoueur2){
                            //console.log('attenteTour - avant le resolve joueur1 peut jouer');
                            resolve({'CodeHttp':200,'Resultat':'Vous pouvez jouer','Plateau1':
                            doc.plateau1Joueur1, 'Plateau2': doc.plateau2Joueur1, 'DernierCoup': doc.dernierCoupsJouesJoueur2[doc.dernierCoupsJouesJoueur2.length - 1]});
                        }
                        else{
                            //console.log('attenteTour - avant le resolve joueur1 ne peut pas jouer');
                            reject({'CodeHttp':409,'Erreur':'Votre adversaire n\'a pas terminé son tour'});
                        }
                    }
                    if(username == doc.usernameUtilisateur2){
                        if(doc.nombreCoupsJoueur1 == doc.nombreCoupsJoueur2 +1){
                            resolve({'CodeHttp':200,'Resultat':'Vous pouvez jouer !','Plateau1':
                            doc.plateau1Joueur1,'Plateau2': doc.plateau2Joueur1,'DernierCoup': doc.dernierCoupsJouesJoueur1[doc.dernierCoupsJouesJoueur1.length - 1]});
                        }
                        else{
                            reject({'CodeHttp':409,'Erreur':'Votre adversaire n\'a pas terminé son tour'});
                        }
                    }               
                });
        })
        
    }
}
    let nbrDeCasesDeBateauEnVieDeLAutreJoueur =  (titre, username, username1) => {
        return new Promise((resolve,reject) =>{
            let count = 0;
            console.log('nbrDeCasesDeBateauEnVieDeLAutreJoueur - début de la méthode - username1? '+username1);

            modelSalon.findOne({title: titre,
                $or:[{usernameUtilisateur1: username},{usernameUtilisateur2: username}]},
                function(err,doc){
                    console.log('nbrDeCasesDeBateauEnVieDeLAutreJoueur - debut du findone');
                    if(username1){
                        for(var i=0; i<10;i++){
                            for(var j=0;j<10;j++){
                                if(doc.plateau1Joueur2[i][j] + doc.plateau2Joueur1[i][j] != 0){
                                    //console.log('i : '+i+ ' j : '+j+ '  doc.plateau1Joueur1[i][j] : '+doc.plateau1Joueur1[i][j]+' doc.plateau2Joueur2[i][j] : '+doc.plateau2Joueur2[i][j]); 
                                    count ++;
                                }
                            }
                        }
                    }
                    else{
                        for(var i=0; i<10;i++){
                            for(var j=0;j<10;j++){
                                if(doc.plateau1Joueur1[i][j] + doc.plateau2Joueur2[i][j] != 0){
                                    //console.log('i : '+i+ ' j : '+j+ '  doc.plateau1Joueur1[i][j] : '+doc.plateau1Joueur1[i][j]+' doc.plateau2Joueur2[i][j] : '+doc.plateau2Joueur2[i][j]);
                                    count ++;
                                }
                            }
                        }
                    }
                    console.log('nbrDeCasesDeBateauEnVieDeLAutreJoueur - fin du findone - count = '+count);
                    resolve({'count':count})
                })
            })
    }

    let mappingCoordonnee = (coordonnee) => {
        console.log('Process mappingCoordonnee - début de la fct - coordonnee.size = '+coordonnee.length);
        let obj = {};
        if(coordonnee.length != 2){
            console.log('Process mappingCoordonnee - les coordonnéers ne correspondent pas');
            obj.abscisse = "error";
            obj.ordonnee = "error";
            return obj;
        }
        coordonnee = new String(coordonnee);
        obj.abscisse = convertisseur.convertisseurLettreChiffre(coordonnee.substr(0,1));
        obj.ordonnee = parseInt(coordonnee.substr(1)) -1;
        console.log('Process mappingCoordonnee - fin de la fct abscisse = '+obj.abscisse+'\tordonnee = '+obj.ordonnee);
        return obj;
}