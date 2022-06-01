const mongoose = require('mongoose');

const cartellinoSchema = new mongoose.Schema({
    id:{
        type: String,
        required:true
    },
    data:{
        type: Date,
        required: false
    },  
    tipo:{
        type: String,
        required: false
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