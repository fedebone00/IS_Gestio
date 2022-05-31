const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    data: {
        type: String,
        required: true,
        unique: true   
    },
    primo: {
        type: String,
        required: true    
    },
    secondo: {
        type: String,
        required: true    
    },
    dolce: {
        type: String
    }
});

const Menu = mongoose.model("Menu", menuSchema);
module.exports =  Menu;