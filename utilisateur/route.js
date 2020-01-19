const app = require('express').Router();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const action = require('./action');


//app.post('/users/register',action.register);
app.all('/users/register',action.register);

app.all('/users/login',action.login);
//app.get('/users/login',action.login);

app.all('/users/decrypt',action.decrypt);
//app.get('/users/decrypt',action.decrypt);

app.all('/users/suppressionUtilisateur',action.deleteUser);

module.exports = app;