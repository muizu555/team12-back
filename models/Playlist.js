const mongoose = require("mongoose");


const PlaylistSchema = new mongoose.Schema({//playlist
    items: {
        type: Array,
        default: [],
    }
})













module.exports = mongoose.model("Playlist", PlaylistSchema);