const mongoose = require('mongoose');

const cartellinoSchema = new mongoose.Schema({
    data:{
        type: Date,
        required: false
    },  
    tipo:{
        type: String,
        required: true
    },
    ora:{
        type: String,
        required: false
    } , 
    smartworking:{
        type: Boolean,
        required:false,
        default: false
    } 
});

const Cartellino = mongoose.model("cartellino",cartellinoSchema);
module.exports= Cartellino;