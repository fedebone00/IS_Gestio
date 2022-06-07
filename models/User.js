const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    password_hash: String,
    salt: String,
    role: String
});

userSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        var retJson = {
            _id: ret._id,
            email: ret.email,
            role: ret.role,
        };
        return retJson;
    }
});

const User = mongoose.model("user", userSchema);

module.exports = User;