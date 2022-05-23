
const { mongoose } = require('mongoose');

const menuSchema = mongoose.Schema({
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
    dolce: String
});

const Menu = mongoose.model("Menu", menuSchema);

module.export =  Menu;