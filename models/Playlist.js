const mongoose = require("mongoose");


const PlaylistSchema = new mongoose.Schema({//userのobjectIdもuserIdとして保持しておきたいかも
    items: {
        type: Array,
        default: [],
    },
    playListId: {
        type: String,
        default: true,
    }
})


 










module.exports = mongoose.model("Playlist", PlaylistSchema);