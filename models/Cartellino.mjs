import { mongoose } from 'mongoose';

const Cartellino = mongoose.model("cartellino",{data: Date, tipo: String ,ora: String, smartworking: Boolean})

export default Cartellino;