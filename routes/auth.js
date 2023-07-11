const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Playlist = require("../models/Playlist");
//const bcrypt = require("bcrypt");


router.post("/register", async(req,res) => {
    try {
        const { username, playlistId } = req.body;
        console.log(username);
        console.log(playlistId);

        
        const newUser = await new User({
            username: username,
            playlistId: playlistId,
        });
        const user = await newUser.save();
        const newPlayList = await new Playlist({playListId: playlistId});
        const playlist = await newPlayList.save();
        //req.session.user_id = user._id;  //一応sessionに保存している 後で実装
        return res.status(200).json({user,playlist});
    } catch (err) {
        return res.status(500).json(err.message);//500はサーバー関連のerr
    }
});












module.exports = router;