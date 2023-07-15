const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    tokens: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Auth", AuthSchema);
