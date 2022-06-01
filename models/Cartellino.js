const mongoose = require('mongoose');

const cartellinoSchema = new mongoose.Schema({
    data:{
        type: Date,
        required: true
    },  
    tipo:{
        type: String,
        required: true
    },
    ora:{
        type: String,
        required: true
    } , 
    smartworking:{
        type: Boolean,
        required:false,
        default: false
    } 
});

const Cartellino = mongoose.model("cartellino",cartellinoSchema);
module.exports= Cartellino;