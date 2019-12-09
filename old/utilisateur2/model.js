var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var utilisateur = new Schema({
    nom: String,
    prenom: String,
    pseudo: String,
    password: String,
    email: String,
    age: Number,
    token: String,
});

module.exports = mongoose.model('Utilisateur',utilisateur);