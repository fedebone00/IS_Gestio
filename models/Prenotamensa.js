const mongoose = require('mongoose')

const prenotamensaSchema = mongoose.Schema({
    user_id:{
        type: String,
        required:false
    },
    prenotazione:{
        type: Boolean,
        required:false,
        default: false
    }
});

const PrenotaMensa = mongoose.model("prenotamensa", prenotamensaSchema);
module.exports = PrenotaMensa;