import { mongoose } from 'mongoose';

const malattiaSchema = mongoose.Schema({
    email:{
        type: String,
        required:true
    },
    certificato:{
        type: Buffer,
        required:true
    },
    dataInizio:{
        type: Date,
        required:true
    },
    dataFine:{
        type: Date,
        required:true
    } 
});

const Malattia = mongoose.model("malattia", malattiaSchema);

export default Malattia;