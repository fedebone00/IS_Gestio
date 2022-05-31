const mongoose = require('mongoose');

const bachecaSchema = new mongoose.Schema({
    testoAnnuncio:{
        type: String,
        required: true
    },  
    scadenzaAnnuncio:{
        type: String,
        required: true
    }
});

const Bacheca = mongoose.model("bacheca",bachecaSchema);
module.exports = Bacheca;