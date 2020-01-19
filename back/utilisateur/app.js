//-----Définition des modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var path = require('path');
const mongoose = require("mongoose");
const fileUpload = require('express-fileupload');
mongoose.connect('mongodb://localhost/batailleNavale',
    {useNewUrlParser:true,useFindAndModify:false,useUnifiedTopology:true})
    .then(()=> console.log('Vous êtes connecté à MongoDB !'))
    .catch(err => console.error('Quelque chose c\'est mal !',err));

app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//-----appel des routes
app.use('/',require('./route'));


app.listen(8282);
console.log("serveur démarré sur http://localhost:8282");

module.exports = app;
