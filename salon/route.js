const app = require('express').Router();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const action = require('./action');
const jwutils = require("../utilisateur/jwt.utils");

app.post('/creersalon',action.creerSalon);
app.put('/rejoindresalon',action.rejoindreSalon);
app.get('/affichersalons',action.afficherSalons);



module.exports = app;