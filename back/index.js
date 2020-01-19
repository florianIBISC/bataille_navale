var path = require('path');
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');

var cors = require('cors');
app.use(cors());


//Set up a whitelist and check against it:
var whitelist = ['http://localhost:27017/%27,%27http://localhost:8080%27,%27http://localhost:3000'];
var corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
  // origin: function (origin, callback) {
  //   if (whitelist.indexOf(origin) !== -1) {
  //     callback(null, true)
  //   } else {
  //     callback(new Error('Not allowed by CORS'))
  //   }
  // },
  // methods:'GET', 'PUT', 'POST',
}
// Then pass them to cors:
app.use(cors(corsOptions));

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
app.use('/',require('./mail/route'));


app.get('/imateapot',(req,res) => {
    res.set({'Content-Type': 'image/gif'});
    res.status(418);
    res.sendFile(path.join(__dirname + '/ressource/theiere.gif'));
});

app.use(function(req,res){
    res.status(404);
    res.set('Location','../affichersalons');
    res.set('Content-Type','text/html');
    res.sendFile(path.join(__dirname + '/ressource/notfound.html'));
});
app.listen(8080,()=>{
    console.log('Hello World !');
})