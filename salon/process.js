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

              /*resolve(
                  salon
                    .save()
                    .then(()=>{res.send(salon);})
                    .catch(()=>{reject({ Erreur: "Problème interne" ,
                    'CodeHttp':500})})
                );*/
                salon.save().then(() => {
                  resolve({'Resultat':'Salon crée !','CodeHttp':201,'Salon':salon})
                })
                
              }
        })}      
    });
},
    afficherSalon: (req,res)=>{
        return new Promise((resolve,reject)=>{
          let token = req.headers["authorization"];
          let username = jwutils.getUserId(token).pseudo;
  
          if(username == -1 || username == undefined || username == null){
            reject({'Erreur':'Problème avec votre session veuillez vous reconnecter','CodeHttp':400});
          }
            model.find({usernameUtilisateur2:undefined}).then((salons)=>{
                if(salons.length > 0){
                  let objRetourne = {};
                  for(let i=0;i<salons.length;i++){
                    let newObject = {};
                    newObject['Salon '+(i+1)] = salons[i].title;
                    newObject['Joueur du salon '+(i+1)] = salons[i].usernameUtilisateur1;
                    objRetourne = Object.assign(objRetourne,newObject);
                  }
                  objRetourne = Object.assign(objRetourne,{'CodeHttp':200});
                  resolve(objRetourne);
                }
                else{
                  resolve({'Salons':'Il n\'y a aucun salon','CodeHttp':204})
                }
            }).catch((err)=>{
                reject({'Erreur': 'Problème interne',
                'CodeHttp':500})
            });
        })
    },
    salonPlein: (req,res) => {
      return new Promise((resolve,reject) => {
        let token = req.headers["authorization"];
        let username = jwutils.getUserId(token).pseudo;

        if(username == -1 || username == undefined || username == null){
          reject({'Erreur':'Problème avec votre session veuillez vous reconnecter','CodeHttp':400});
        }
        let queryParam = req.query;
        let titleSalon = queryParam.title;
        let user2;

        if(titleSalon == undefined || titleSalon == null){
          reject({'Erreur':'Problème dans l\'url','CodeHttp':400})
        }
        model.findOne({title: titleSalon},function(err,doc){
          console.log(doc.usernameUtilisateur2);
          user2 = doc.usernameUtilisateur2;
          if(user2 != undefined){
            resolve({'CodeHttp':205,'Message':'Vous avez été rejoins par '+user2});
          }
          else{
            resolve({'Message':'Il n\'y a pas d\'autres joueur encore :( ','CodeHttp':200})
          }
        })
      })

    },

    rejoindreSalon: (req,res) => {
      return new Promise((resolve,reject)=>{

        let token = req.headers["authorization"];
        let username = jwutils.getUserId(token).pseudo;

        if(username == -1 || username == undefined || username == null){
          reject({'Erreur':'Problème avec votre session veuillez vous reconnecter','CodeHttp':400});
          return;
        }

        model.find({title: req.body.title},function(_err,salon){
          if(_err){
            reject({'Erreur':'Problème interne','CodeHttp':500});
          }
          if(salon.length == 0){
            reject({'Erreur':'Le salon spécifié n\'existe pas','CodeHttp':400});
            return;
          }
          let salonSansJoueur2 = salon[0].usernameUtilisateur2 == undefined;

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

