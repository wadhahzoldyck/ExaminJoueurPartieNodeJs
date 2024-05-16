const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const joueurSchema = new Schema({
    pseudo : String ,
    sante : Number ,
    score : Number ,
} , {
    timestamps : true ,
})

module.exports = mongoose.model('joueur' , joueurSchema);