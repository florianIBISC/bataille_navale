//Import
const mongoose = require("mongoose");
const jwutils = require("../utilisateur/jwt.utils");
const model = require("./model");


module.exports = {
  creerSalon: (req, res) => {
    return new Promise((resolve, reject) => {
      if(req.headers.authorization == null){
        reject({'Erreur':'Echec d\'authentification',
      'CodeHttp':401});
      }
      else if(req.body.title == null || req.body.title.length==0){
        reject({'Erreur':'Titre du salon manquant',
      'CodeHttp':400});
      }
      else{
        let nomSalon = req.body.title;
        model.find({ title: nomSalon }).then(salon => {
          if (salon.length != 0) {
            reject({ Erreur: "Nom de salon déjà pris !" ,
            'CodeHttp':400});
          }
          else{
              let plateau1Joueur1 = new Array(10);
              for (var i = 0; i < 10; i++) {
                  plateau1Joueur1[i] = new Array(10).fill(0);
              }
              let plateau2Joueur1 = plateau1Joueur1.slice(0);
              let plateau1Joueur2 = plateau1Joueur1.slice(0);
              let plateau2Joueur2 = plateau1Joueur1.slice(0);
              let salon = new model({
                  'title': nomSalon,
                  'usernameUtilisateur1': jwutils.getUserId(req.headers['authorization']).pseudo,
                  'plateau1Joueur1': plateau1Joueur1,
                  'plateau2Joueur1': plateau2Joueur1,
                  'plateau1Joueur2': plateau1Joueur2,
                  'plateau2Joueur2': plateau2Joueur2,
                  'nombreCoupsJoueur1': 0,
                  'nombreCoupsJoueur2': 0,
                  'dernierCoupsJouesJoueur1': [],
                  'dernierCoupsJouesJoueur2': []
                });

              resolve(
                  salon
                    .save()
                    .then(()=>{res.send(salon);})
                    .catch(()=>{reject({ Erreur: "Problème interne" ,
                    'CodeHttp':500})})
                );
              }
        })}      
    });
},
    afficherSalon: (req,res)=>{
        return new Promise((resolve,reject)=>{
            model.find({usernameUtilisateur2:undefined}).then((salons)=>{
                if(salons.length > 0){
                    resolve({'Salons':salons,'CodeHttp':200});
                }
                else{
                  resolve({'Salons':'Il n\'y a aucun salon','CodeHttp':204})
                }
            }).catch((err)=>{
                reject({'Erreur': 'Problème inetrne',
                'CodeHttp':500})
            });
        })
    },
    salonPlein: (req,res) => {
      return new Promise((resolve,reject) => {
        let queryParam = req.query;
        let titleSalon = queryParam.title;
        let user2;

        if(titleSalon == undefined || titleSalon == null){
          reject({'Erreur':'Problème dans l\'url','CodeHttp':500})
        }
        console.log('SalonPlein méthode - avant recherche mongoose');
        model.findOne({title: titleSalon},function(err,doc){
          console.log(doc.usernameUtilisateur2);
          user2 = doc.usernameUtilisateur2;
          if(user2 != undefined){
            resolve({'CodeHttp':205,'Joueur2':user2});
          }
          else{
            reject({'Erreur':'Il n\'y a pas d\'autres joueur encore','CodeHttp':500})
          }
        })
      })

    },

    rejoindreSalon: (req,res) => {
      return new Promise((resolve,reject)=>{

        console.log('Début de la promesse');
        let token = req.headers["authorization"];
        let username = jwutils.getUserId(token).pseudo;

        if(username == -1 || username == undefined || username == null){
          reject({'Erreur':'Problème avec votre session veuillez vous reconnecter','CodeHttp':400});
        }

        model.find({title: req.body.title},function(_err,salon){
          if(_err){
            reject({'Erreur':'Problème interne','CodeHttp':500});
          }
          //console.log('Début du .find');
          console.log('...'+salon[0].usernameUtilisateur2);
          let salonSansJoueur2 = salon[0].usernameUtilisateur2 == undefined;
          console.log('Process salon - le salon '+req.body.title+' ne comporte t\'il pas de joueur 2 ? '+salonSansJoueur2);

          if(salonSansJoueur2){
            model.findOneAndUpdate({title: req.body.title}, {$set: {usernameUtilisateur2: username}},function(err,salonUpdate){
              if(err){
                reject({'Erreur':'Problème interne','CodeHttp':500});
              }
              resolve({'Salon': salonUpdate,'CodeHttp':200});
            })
          }else{
            reject({'Erreur':'Salon complet !','CodeHttp':409});
          }

        })
      })
    }
}

