const mongoose = require('mongoose')

const malattiaSchema = mongoose.Schema({
    email:{
        type: String,
        required:true
    },
    certificato:{
        type: String,
        required:false
    },
    dataInizio:{
        type: String,
        required:true
    },
    dataFine:{
        type: String,
        required:true
    } 
});

const Malattia = mongoose.model("malattia", malattiaSchema);
module.exports = Malattia;