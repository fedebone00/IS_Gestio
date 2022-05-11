import { mongoose } from 'mongoose';

const PrenotaMensa = mongoose.model("prenotamensa", {user_id: String, prenota: Boolean});

export default PrenotaMensa;