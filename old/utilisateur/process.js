const mongoose = require('mongoose');
let model = require('./model');
mongoose.connect('mongodb://localhost/batailleNavale',{useNewUrlParser:true});

module.exports = {
    inscription: (req,res)=>{
        console.log('PROCESS');
        return new Promise((resolve,reject)=>{
            model.find({pseudo:req.body.pseudo}).then(utilisateur =>{
                console.log(utilisateur.length);
                if(utilisateur.length == 0){
                    let nouveauUtilisateur = new model({
                        nom: req.body.nom,
                        prenom: req.body.prenom,
                        pseudo: req.body.pseudo,
                        password: req.body.password,
                        email: req.body.email,
                        age: req.body.age,
                    });
                    console.log(nouveauUtilisateur.pseudo);
                    resolve(nouveauUtilisateur.save().then(res.send(nouveauUtilisateur)));
                }
                else{
                    reject({'Erreur': 'Utilisateur déjà existant'});
                }
            })
        })
    }
}