import { mongoose } from 'mongoose';

const userSchema = new mongoose.Schema({
    email: String,
    password_hash: String,
    salt: String,
    role: String
});

const User = mongoose.model("user", userSchema);

export default User;