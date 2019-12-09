const app = require('express').Router();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const action = require('./action');
const jwutils = require("../utilisateur/jwt.utils");

app.post('/creersalon',action.creerSalon);
app.get('/rejoindresalon',action.rejoindreSalon);
app.get('/affichersalons',action.afficherSalons);

app.get('/token',(req,res)=>{
    let token = req.headers['authorization'];
    console.log(token);
    let username = jwutils.getUserId(req.headers['authorization']).pseudo;
    console.log(username);
    //res.send(username);
});

module.exports = app;