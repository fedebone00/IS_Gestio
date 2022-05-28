const mongoose = require('mongoose');

const messaggioSchema = new mongoose.Schema({
    messaggio:{
        type: String,
        required:true
    },
    email:{
        type: String,
        require: true
    },
    data:{
        type: Date,
        required: true,
        default: Date().now
    }
});

const Messaggio = mongoose.model("messaggio", messaggioSchema);
module.exports= Messaggio;