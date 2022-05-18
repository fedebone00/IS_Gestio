import { mongoose } from 'mongoose';

const Malattia = mongoose.model("malattia", {certificato: Buffer, data: String});

export default Malattia;