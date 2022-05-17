import { mongoose } from 'mongoose';

const User = mongoose.model("user", {email: String, password_hash: String, salt: String, role: String});

export default User;