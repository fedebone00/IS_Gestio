import { mongoose } from 'mongoose';

const User = mongoose.model("user", {email: String});

export default User;