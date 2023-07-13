const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema({
    userId: {
        type: String,
        //もしかしたら　default: true
    },
    accessToken: {
        type: String,
    },
    refreshToken: {
        type: String,
    }

});

module.exports = mongoose.model("Auth", AuthSchema);
