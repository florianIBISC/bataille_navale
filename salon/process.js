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
      else if(req.body.title == undefined){
        reject({'Erreur':'Titre du salon manquant',
      'CodeHttp':400});
      }
      else{
        let nomSalon = req.body.title;
        let p1 = new Array(10);
        for (var i = 0; i < 10; i++) {
          p1[i] = new Array(10).fill(0);
        }
        let p2 = p1.slice(0);
        model.find({ title: nomSalon }).then(salon => {
          if (salon.length != 0) {
            reject({ Erreur: "Nom de salon déjà pris !" ,
            'CodeHttp':400});
          }
          else{
              let salon = new model({
                  title: nomSalon,
                  usernameUtilisateur1: jwutils.getUserId(req.headers['authorization']).pseudo,
                  plateau1: p1,
                  plateau2: p2
                });
                resolve(
                  salon
                    .save()
                    .then(()=>{res.send(salon)})
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
                  resolve({'Salons':'Il n'y a aucun salon','CodeHttp':204})
                }
            }).catch((err)=>{
                reject({'Erreur': 'Problème inetrne',
                'CodeHttp':500})
            });
        })
    },

    rejoindreSalon: (req,res) => {
      return new Promise((resolve,reject)=>{
        model.find({title: req.body.title}).then(salon=>{
          let token = req.headers["authorization"];
          let username = jwutils.getUserId(token).pseudo;
          console.log("Process rejoindreSalon - salon.usernameUtilisateur2 : "+salon.usernameUtilisateur2);
          if(salon.usernameUtilisateur2 == undefined){
            console.log(username);
            salon.usernameUtilisateur2 = username;
            resolve({model.findOneAndUpdate({title: req.body.title},{$set: {usernameUtilisateur2: username}}})
            .then(salon=>salon).catch(()=>{reject({'Erreur': 'Problème inetrne',
            'CodeHttp':500})}));

          }
          else if(username == -1 || username==undefined){
            reject({'Erreur':'Il y a un problème avec votre session tentez de vous reconnecter',
            'CodeHttp':401})
          }
          else if(salon.usernameUtilisateur2.length>0){
            reject({'Erreur':'Salon complet !',
            'CodeHttp':409})
          }
          else{
            reject({'Erreur':'Veuillez vous rapprochez de l\'administrateur',
            'CodeHttp':500})
          }
        })
      })
    }
}
