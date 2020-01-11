var path = require('path');
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');


mongoose.connect('mongodb://localhost/batailleNavale',
    {useNewUrlParser:true,useFindAndModify:false,useUnifiedTopology:true})
    .then(()=> console.log('Vous êtes connecté à MongoDB !'))
    .catch(err => console.error('Quelque chose c\'est mal !',err));


    
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',require('./salon/route'));
app.use('/',require('./utilisateur/route'));
app.use('/',require('./options/route'));
app.use('/',require('./jeu/route'));


app.get('/imateapot',(req,res) => {
    res.set({'Content-Type': 'image/gif'});
    res.status(418);
    res.sendFile(path.join(__dirname + '/ressource/theiere.gif'));
});

app.use(function(req,res){
    res.status(404);
    res.set('Location','../../affichersalons');
    res.set('Content-Type','text/html');
    res.sendFile(path.join(__dirname + '/ressource/notfound.html'));
});
app.listen(8080,()=>{
    console.log('Hello World !');
})