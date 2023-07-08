const mongoose = require("mongoose");


const PlaylistSchema = new mongoose.Schema({//
    items: {
        type: Array,
        default: [],
    }
})


 










module.exports = mongoose.model("Playlist", PlaylistSchema);