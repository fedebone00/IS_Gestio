const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    logo:{
        type: Buffer, // TODO fix me pls
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

const Azienda = mongoose.model("azienda",companySchema);
module.exports= Azienda;
