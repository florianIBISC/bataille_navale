var mongoose = require('mongoose');
var utilisateur = mongoose.model('Utilisateur');

let regex =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/*exports.inscription = async (req,res)=>{
    console.log('controller js - inscription');
    let nouveauUtilisateur = null;
    if(await utilisateur.findOne({pseudo: req.body.pseudo}) || await utilisateur.findOne({pseudo: req.body.email})){
        console.log('Utilisateur existe déjà !');
        return res.status(403).send('That user already exist !');
    }
    else{
        nouveauUtilisateur = new utilisateur({
            nom: req.body.nom,
            prenom: req.body.prenom,
            pseudo: req.body.pseudo,
            password: req.body.password,
            email: req.body.email,
            age: req.body.age,
        });
        await nouveauUtilisateur.save();
        res.send(nouveauUtilisateur);
    }

}
*/
exports.hello = (req,res)=>{
    console.log('Hello World !');
    res.send('Hello');
}

exports.inscription = (req,res)=>{
    console.log('controller js - inscription');
    let body = req.body;
    body.email = body.email.trim().toLowerCase();
    if(body.pseudo == undefined || body.prenom == undefined ||
        body.nom == undefined || body.password == undefined ||
        body.email == undefined || body.age == undefined){
            res.status(401).send('Vous n\'avez pas rempli un champ !');
        }

    else{
        utilisateur.find({$or:[{pseudo: body.pseudo},{email: body.email}]}).then(user =>{
            console.log(user.length);
            if(user.length != 0){
                res.status(403).send('L\'utilisateur existe deja ! ');
            }
            else{
                let nouveauUtilisateur = new utilisateur({
                    nom: req.body.nom,
                    prenom: req.body.prenom,
                    pseudo: req.body.pseudo,
                    password: req.body.password,
                    email: req.body.email,
                    age: req.body.age,
                });
                nouveauUtilisateur.save().then(res.status(200).send('Utilisateur crée !'));
            }
        });
    }
};