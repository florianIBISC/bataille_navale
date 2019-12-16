const app = require('express').Router();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const action = require('./action');


app.post('/users/register',action.register);

app.get('/users/login',action.login);

app.get('/users/decrypt',action.decrypt);

module.exports = app;