const mongoose = require('mongoose');

let utilisateur = new mongoose.Schema({
    nom: String,
    prenom: String,
    pseudo: String,
    password: String,
    email: String,
    age: Number,
    token: String,
});

let User = mongoose.model('utilisateur',utilisateur);
//module.exports= utilisateur;