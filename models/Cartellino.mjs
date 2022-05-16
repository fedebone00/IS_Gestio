import { Timestamp } from 'mongodb';
import { mongoose } from 'mongoose';

const Cartellino = mongoose.model("cartellino",{data: Date, tipo: String ,ora: String})

export default Cartellino;