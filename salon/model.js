var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var salon = new Schema({
    title: String,
    usernameUtilisateur1: String,
    usernameUtilisateur2: String,
    plateau1: [[Number]],
    plateau2: [[Number]]
});
module.exports = mongoose.model('Salon',salon);