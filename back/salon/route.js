const app = require('express').Router();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const action = require('./action');
const jwutils = require("../utilisateur/jwt.utils");

//app.post('/creersalon',action.creerSalon);
app.all('/salon/creersalon',action.creerSalon);

app.all('/salon/rejoindresalon',action.rejoindreSalon);
//app.put('/rejoindresalon',action.rejoindreSalon);

app.all('/salon/affichersalons',action.afficherSalons);
//app.get('/affichersalons',action.afficherSalons);
app.all('/salon/salonplein',action.salonPlein);
//app.get('/salonplein',action.salonPlein);

/*app.route('/salonplein')
.get(action.salonPlein)
.post((req,res)=>{
    res.status(405).json({'Erreur':'Méthode get'})
})*/
module.exports = app;