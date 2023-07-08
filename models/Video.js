const mongoose = require("mongoose");

const VideoSchema = new new mongoose.Schema({
    publishedAt: {//動画の再生開始
        type: Datetime,
        default: true,
    },
    duration: {
        type: String,
        //default: true
    },
})


module.exports = mongoose.model("Video", VideoSchema);