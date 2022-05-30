const mongoose = require('mongoose');

const aziendaSchema = new mongoose.Schema({
    logo:{
        type: Image,
        required: true
    },  
    partiaiva:{
        type: String,
        required: true
    },
    contatto:{
        type: String,
        required: true
    } 
});

const Azienda = mongoose.model("azienda",aziendaSchema);
module.exports= Azienda;