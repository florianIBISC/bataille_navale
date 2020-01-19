//Import
const mongoose = require("mongoose");
const jwutils = require("../utilisateur/jwt.utils");
const modelSalon = require("../salon/model");
const modelUser = require("../utilisateur/model");
const convertisseur = require("../ressource/convertisseurLettreEnChiffre");
const ObjectId = mongoose.Types.ObjectId;
const nbrTotalDeCase = 5;

module.exports = {
    initialiser: (req,res) => {
        return new Promise((resolve,reject) => {
            let token = req.headers["authorization"];
            let username = jwutils.getUserId(token).pseudo;

            if(username == -1 || username == undefined || username == null){
                reject({'Erreur':'Problème avec votre session veuillez vous reconnecter','CodeHttp':400});
                return;
            }
            modelSalon.findOne({title: req.body.title,
            $or:[{usernameUtilisateur1: username},{usernameUtilisateur2: username}]},
            function(err,doc){
                if(err){
                    reject({'Erreur':'Erreur interne veuillez nous excuser pour la gêne occasionnée','CodeHttp':500})
                }
                if(doc == null){
                    reject({'Erreur':'Vous ne participez pas à cette partie !','CodeHttp':400})
                    return;
                }
                let configurationBateau = null;
                if(req.body.bateau == null){
                    reject({'Erreur':'Vous n\'avez pas rempli votre grille !','CodeHttp':400})
                }
                configurationBateau = req.body.bateau;
                let nombreCoupsJoueur1 = doc.nombreCoupsJoueur1;
                let nombreCoupsJoueur2 = doc.nombreCoupsJoueur2;

                let configurationBateauTabFinal = [];
                let j= 0;
                let tailleTab = 0;
                let tabTemp = new Array();
                while(j<configurationBateau.length){
                    if(configurationBateau.charAt(j)=='1' || configurationBateau.charAt(j)=='0'){
                        if(tailleTab == 11){
                            configurationBateauTabFinal.push(tabTemp);
                            tailleTab = 0;
                            tabTemp = new Array();
                        }
                        let case22 = parseInt(configurationBateau.charAt(j));
                        tabTemp.push(case22);
                        tailleTab ++;
                    }
                    j ++;

                }
                if(configurationBateauTabFinal.length == 9){
                    let tmp = new Array(10).fill(0);
                    configurationBateauTabFinal.push(tmp);

                }
                if(username == doc.usernameUtilisateur1){
                    if(nombreCoupsJoueur1 > 0){
                        reject({'Erreur':'Vous avez déjà rempli votre grille !','CodeHttp':400});
                        return;
                    }
                    nombreCoupsJoueur1 ++;
                    modelSalon.updateOne({title: req.body.title},{$set: {'plateau1Joueur1':configurationBateauTabFinal,'nombreCoupsJoueur1':nombreCoupsJoueur1}})
                    .catch(error => {
                        reject({'Erreur':'Erreur interne veuillez nous excuser pour la gêne occasionnée','CodeHttp':500})
                    });
                    resolve({'Resultat':'Vos bateaux ont été placé. Ceux de votre adversaire aussi. Vous pouvez attaquer','CodeHttp':200});
                }
                else if(username == doc.usernameUtilisateur2){
                    if(nombreCoupsJoueur2 > 0){
                        reject({'Erreur':'Vous avez déjà rempli votre grille !','CodeHttp':400});
                        return;
                    }
                    nombreCoupsJoueur2 ++;
                    modelSalon.updateOne({title: req.body.title},{$set: {'plateau1Joueur2':configurationBateauTabFinal,'nombreCoupsJoueur2':nombreCoupsJoueur2}})
                    .catch(error => {
                        reject({'Erreur':'Erreur interne veuillez nous excuser pour la gêne occasionnée','CodeHttp':500})
                    });
                    resolve({'Resultat':'Vos bateaux ont été placé. Il ne reste plus qu\'à attendre votre adversaire','CodeHttp':200});
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
            let nouveauScore;
            let nombreCoupsJoueur1;
            let nombreCoupsJoueur2;
            let dernierCoup;
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
                        dernierCoup = doc.dernierCoupsJouesJoueur1;
                        dernierCoup.push(coordonneeLettreChiffre);
                        console.log('Process attaquer - le joueur 1 attaque - doc.usernameUtilisateur1 = '+doc.usernameUtilisateur1);
                        //il touche le joueur 2
                        if(doc.plateau1Joueur2[abscisse][ordonnee] > 0){
                            let plateau2Joueur1 = doc.plateau2Joueur1;
                            plateau2Joueur1[abscisse][ordonnee] = -2;
                            nombreCoupsJoueur1 = doc.nombreCoupsJoueur1 + 1;


                            modelUser.findOne({pseudo: username},(err,doc) => {
                                nouveauScore = doc.score + 10;
                                modelUser.updateOne({pseudo: username},{$set: {'score':nouveauScore}});
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
                            modelSalon.updateOne({title: req.body.title},{$set: {'plateau2Joueur1':plateau2Joueur1,'nombreCoupsJoueur1':nombreCoupsJoueur1, 'dernierCoupsJouesJoueur1':dernierCoup}},
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
                        dernierCoup = doc.dernierCoupsJouesJoueur2;
                        dernierCoup.push(coordonneeLettreChiffre);
                        //Il touche le joueur 1
                        if(doc.plateau1Joueur1[abscisse][ordonnee] > 0){

                            let plateau2Joueur2 = doc.plateau2Joueur2;
                            plateau2Joueur2[abscisse][ordonnee] = doc.plateau1Joueur1[abscisse][ordonnee] * -1;

                            nombreCoupsJoueur2 = doc.nombreCoupsJoueur2 + 1;
                            console.log('Process attaquer - plateau2Joueur2 : '+plateau2Joueur2);

                            modelUser.findOne({pseudo: username},
                                function(err,doc){
                                    console.log('Process attaquer - trouver un user pseudo : '+doc.pseudo);
                                    nouveauScore = doc.score + 10;
                                    //console.log('Process attaquer - score : '+doc.score+' - nouveauScore : '+nouveauScore);

                                    modelUser.updateOne({pseudo: username},{$set: {score:nouveauScore}});

                                });                            

                            modelSalon.updateOne({title: req.body.title},{$set: {'plateau2Joueur2':plateau2Joueur2,'nombreCoupsJoueur2':nombreCoupsJoueur2, 'dernierCoupsJouesJoueur2':dernierCoup}},
                            (err,doc) => {
                                if(err){
                                    reject({'Erreur':'Erreur interne veuillez nous excuser pour la gêne occasionnée','CodeHttp':500})
                                }
                                console.log('Process attaquer - modelSalon.updateOne fin : ');

                            });
                            nbrDeCasesDeBateauEnVieDeLAutreJoueur(req.body.title,username,false).then(nbr => {
                                console.log('Process attaquer - nbrCasesAdversesNonTouches : '+nbr.count);
                                if(nbr.count == 0 ){
                                    resolve({'CodeHttp':200,'Resultat': 'Vous avez gagné la partie. Félicitation','PlateauJoueurAdverse':plateau2Joueur2})
                                }
                                else{
                                    resolve({'CodeHttp':200,'Resultat': 'Touché','PlateauJoueurAdverse':plateau2Joueur2,'nombreCoupsJoueur2':nombreCoupsJoueur2})
                                }
                            })
                        }
                        //tir dans l'eau
                        else if(doc.plateau1Joueur1[abscisse][ordonnee] == 0){
                            let plateau2Joueur2 = doc.plateau2Joueur2;
                            plateau2Joueur2[abscisse][ordonnee] = -1;
                            modelSalon.updateOne({title: req.body.title},{$set: {'plateau2Joueur2':plateau2Joueur2, 'dernierCoupsJouesJoueur2':dernierCoup}},
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