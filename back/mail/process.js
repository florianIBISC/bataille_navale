//Import
const mongoose = require("mongoose");
const jwutils = require("../utilisateur/jwt.utils");
const modelUser = require("../utilisateur/model");
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');

module.exports = {
  motdepasseoublie: (req, res) => {
      return new Promise((resolve,reject)=>{
        let email = req.body.email;
        let nvPassword = req.body.password;
        let confirmationPassword = req.body.confirmation;

        if(nvPassword != confirmationPassword){
          reject({'CodeHttp':400,'Erreur':'Le mot de passe n\'a pas été confirmé'})
        }
        bcrypt.hash(nvPassword, 5, function (err, bcryptedPassword) {
          console.log('process mail - passwordhash : '+bcryptedPassword);
          modelUser.updateOne({'email':email}, {$set: {'password':bcryptedPassword}});
        });

        mail(email,confirmationPassword).then((res) => {
          resolve({'CodeHttp':200,'message':res.Message})
        }).catch((err)=>{
          resolve({'CodeHttp':500,'message':'Requête non traité suite à un problème interne'})
        })

      })
    }

};

let mail = (email, password) => {
  return new Promise((resolve,reject) => {
    let textMessage = "Nouveau mot de passe : "+password;
    console.log('Process email - email : '+email+' password : '+password);

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "mattermost.ueve@gmail.com", 
        pass: "M@ttermost2019" 
      }
    });
  
    let info = transporter.sendMail({
      from: "BattleShip Community", 
      to: email, 
      subject: "Changement de mot de passe", 
      text: textMessage, 
      html: "<b>"+textMessage+"</b>"
    });
  
    transporter.close();
    resolve({'Message':'Votre mot de passe a été changé avec succès'});
  
  })

}
