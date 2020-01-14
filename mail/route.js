const app = require('express').Router();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const action = require('./action');
const jwutils = require("../utilisateur/jwt.utils");

app.put('/motdepasseoublie',action.motdepasseoublie);



module.exports = app;