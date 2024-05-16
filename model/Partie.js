const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const partieSchema = new Schema({
    nom : String ,
    joueur_1 : String ,
    joueur_2 : String ,
    etat : String ,
} ,{
    timestamps : true ,
})

module.exports = mongoose.model('partie' , partieSchema)