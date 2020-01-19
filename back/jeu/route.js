const app = require('express').Router();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const action = require('./action');
const jwutils = require("../utilisateur/jwt.utils");

//Mise en place des bateaux
//app.put('/jeu/initialiser',action.initialiser);
app.all('/jeu/initialiser',action.initialiser);
app.all('/jeu/attaquer',action.attaquer);
//app.put('/jeu/attaquer',action.attaquer);


app.all('/jeu/attendre',action.attenteDeJouer);
//app.get('/jeu/attendre',action.attenteDeJouer);



module.exports = app;