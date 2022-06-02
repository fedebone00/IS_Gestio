const mongoose = require('mongoose')

const prenotamensaSchema = mongoose.Schema({
    user_id:{
        type: String,
        required:false
    },
    data:{
        type: String,
        required: false
    } 
});

const PrenotaMensa = mongoose.model("prenotamensa", prenotamensaSchema);
module.exports = PrenotaMensa;