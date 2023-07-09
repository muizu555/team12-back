const mongoose = require("mongoose");
const dayjs = require("dayjs");

const VideoSchema = new mongoose.Schema({
    publishedAt: {//動画の再生開始
        type: Date,
        default: true,
    },
    videoId: {
        type: String,
        default: true,
    },
    duration: {
        type: String,
        //default: true
    },
})


module.exports = mongoose.model("Video", VideoSchema);