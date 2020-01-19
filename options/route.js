const app = require('express').Router();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const action = require('./action');
const jwutils = require("../utilisateur/jwt.utils");

app.all('/option/classement',action.afficherClassement);
//app.get('/option/classement',action.afficherClassement);

module.exports = app;