const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema({
    userId: {
        type: String,
        //もしかしたら　default: true
    },
    tokenId: {
        type: String,
        default: true,
    },
});
