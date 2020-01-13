var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var salon = new Schema({
    title: String,
    usernameUtilisateur1: String,
    usernameUtilisateur2: String,
    plateau1Joueur1: [[Number]],
    plateau2Joueur1: [[Number]],
    plateau1Joueur2: [[Number]],
    plateau2Joueur2: [[Number]],
    nombreCoupsJoueur1: Number,
    nombreCoupsJoueur2: Number,
    dernierCoupsJouesJoueur1: [String],
    dernierCoupsJouesJoueur2: [String]
});
module.exports = mongoose.model('Salon',salon);