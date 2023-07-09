const mongoose = require("mongoose");


const PlaylistSchema = new mongoose.Schema({//
    items: {
        type: Array,
        default: [],
    },
    PlayListId: {
        type: String,
        default: true,
    }
})


 










module.exports = mongoose.model("Playlist", PlaylistSchema);