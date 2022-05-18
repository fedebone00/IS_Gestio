import { mongoose } from 'mongoose';

const Ferie = mongoose.model("ferie",{motivazione: String, dataInizio: Date, dataFine: Date})

export default Ferie;
