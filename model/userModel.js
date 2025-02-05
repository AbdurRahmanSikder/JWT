const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isVarified: {
        type: Boolean,
        required: false
    },
    image: {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;