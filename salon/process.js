//Import
const mongoose = require("mongoose");
const jwutils = require("../utilisateur/jwt.utils");
const model = require("./model");

module.exports = {
  creerSalon: (req, res) => {
    return new Promise((resolve, reject) => {
      if (req.headers.authorization != null) {
        let nomSalon = req.body.title;
        let p1 = new Array(10);
        for (var i = 0; i < 10; i++) {
          p1[i] = new Array(10).fill(0);
        }
        let p2 = p1.slice(0);
        model.find({ title: nomSalon }).then(salon => {
          if (salon.length != 0) {
            reject({ Erreur: "Nom de salon déjà pris !" });
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
                    .catch(()=>{console.log("erreur de sauvegarde")})
                );
              }
        })}      
      else {
        reject({ "Erreur ": " Vous etes pas authentifié" });
      }
    });
},
    afficherSalon: (req,res)=>{
        return new Promise((resolve,reject)=>{
            model.find({usernameUtilisateur2:undefined}).then((salons)=>{
                if(salons.length > 0){
                    resolve(salons);
                }
                else{
                    reject('Il n\'y a pas de salon');
                }
            }).catch((err)=>{
                reject({'Erreur': err})
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
            resolve(model.findOneAndUpdate({title: req.body.title},{$set: {usernameUtilisateur2: username}})
            .then(salon=>salon).catch(()=>{console.log("Process rejoindreSalon - erreur de sauvegarde")}));

          }
          else if(username == -1 || username==undefined){
            reject({'Erreur':'Il y a un problème avec votre session tentez de vous reconnecter'})
          }
          else if(salon.usernameUtilisateur2.length>0){
            reject({'Erreur':'Salon complet !'})
          }
          else{
            reject({'Erreur':'Veuillez vous rapprochez de l\'administrateur'})
          }
        })
      })
    }

  /*rejoindreSalon: (req, res) => {
    return new Promise((resolve, reject) => {
      model
        .find({ title: req.body.title })
        .then(salon => {
          let token = req.headers["authorization"];
          let username = jwutils.getUserId(token).pseudo;

          if (
            username != salon.usernameUtilisateur1 ||
            username != salon.usernameUtilisateur1
          ) {
            reject({ Erreur: "Ce n'est pas votre salon" });
          } else if (username == salon.usernameUtilisateur1) {
            let salonEcranAdversaireCache = Object.assign({}, salon);
            delete salonEcranAdversaireCache.plateau2;
            resolve(res.send(salonEcranAdversaireCache));
          } else if (username == salon.usernameUtilisateur2) {
            let salonEcranAdversaireCache = Object.assign({}, salon);
            delete salonEcranAdversaireCache.plateau1;
            resolve(res.send(salonEcranAdversaireCache));
          }
        })
        .catch(err => reject({ Erreur: "Pas de salon comportant ce titre" }));
    });*/
}
