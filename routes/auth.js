const express = require("express");
const router = express.Router();
const User = require("../models/User");
//const bcrypt = require("bcrypt");


router.post("/register", async(req,res) => {
    try {
        const { username, playlistId } = req.body;
    
        
        const newUser = await new User({
            username: username,
            playlistId: playlistId,
        });
        const user = await newUser.save();
        //req.session.user_id = user._id;  //一応sessionに保存している 後で実装
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json(err.message);//500はサーバー関連のerr
    }
});












module.exports = router;