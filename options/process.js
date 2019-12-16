//Import
const mongoose = require("mongoose");
const jwutils = require("../utilisateur/jwt.utils");
const modelUser = require("../utilisateur/model");

module.exports = {
  afficherClassement: (req, res) => {
      return new Promise((resolve,reject)=>{
          let token = req.headers["authorization"];
          token = jwutils.getUserId(token);
          if(token == null || token == undefined || token==-1){
              reject({'Erreur':'Votre session a expiré','CodeHTTP':401});
          }
          else{
              modelUser.find({}, function(err,utilisateurs){
                  if(err){
                      reject({'Erreur':'Problème interne','CodeHTTP':500})
                  } else{
                      const sortByScore = (map,compareSc) => (a,b) => compareSc(map(a),map(b));
                      const byScore = (a,b) => b-a;
                      const toScore = obj => obj.score;
                      const fctByScore = sortByScore(toScore,byScore);
                       
                      utilisateurs = [...utilisateurs].sort(fctByScore);
                      const utilisateursMap = utilisateurs.map(u => {
                          var obj = {};
                          obj['pseudo'] = u.pseudo;
                          obj['score'] = u.score;
                          return obj;
                      });
                      resolve({'Utilisateurs':utilisateursMap,'CodeHTTP':200});
                  }
              });
          }
      })
    }

}
