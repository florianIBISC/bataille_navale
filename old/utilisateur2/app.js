var express = require('express');
var app = express();
var port = 8080;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('./model');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/batailleNavale',
    {useNewUrlParser:true,useFindAndModify:false,useUnifiedTopology:true})
    .then(()=> console.log('Vous êtes connecté à MongoDB !'))
    .catch(err => console.error('Quelque chose c\'est mal !',err));


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var routes = require('./route');
routes(app);
app.listen(port,()=>{console.log('API active');});
