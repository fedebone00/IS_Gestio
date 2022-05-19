import { mongoose } from 'mongoose';

const Dipendente = mongoose.model("dipendente",{nome: String, cognome: String ,data: Date, livello: Number, email: String})

export default Dipendente;