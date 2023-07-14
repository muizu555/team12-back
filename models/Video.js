const mongoose = require("mongoose");
const dayjs = require("dayjs");

const VideoSchema = new mongoose.Schema({
    publishedAt: {//動画の再生開始
        type: Date,
        require: true,
    },
    videoId: {
        type: String,
        require: true,
    },
    duration: {
        type: String,
        require: true
    },
})


module.exports = mongoose.model("Video", VideoSchema);