const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Playlist = require("../models/Playlist");
const Auth = require("../models/Auth");
const { google } = require('googleapis');
//const bcrypt = require("bcrypt");
require("dotenv").config();

// Google OAuth2のクライアント情報
const clientId = process.env.YOUR_CLIENT_ID;
const clientSecret = process.env.YOUR_CLIENT_SECRET;
const redirectUri = process.env.YOUR_REDIRECT_URI;





router.post("/register", async(req,res) => {
    try {
        const { username, playlistId } = req.body;
        console.log(username);
        console.log(playlistId);

        
        const newUser = new User({
            username: username,
            playlistId: playlistId,
        });
        const user = await newUser.save();
        req.session.user_id = user._id;  ///ここでユーザーIDをセッションに保存している
        const newPlayList = await new Playlist({playListId: playlistId});
        const playlist = await newPlayList.save();
        //req.session.user_id = user._id;  //一応sessionに保存している 後で実装
        return res.status(200).json({user,playlist});
    } catch (err) {
        return res.status(500).json(err.message);//500はサーバー関連のerr
    }
});


router.post("/googleauth", async (req, res) => {
  try {
    const code = req.body.code;
    console.log(code);

    // アクセストークンとリフレッシュトークンを取得
    const { tokens } = await google.auth.getAccessToken()
    
    ({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
    });

    const accessToken = tokens.access_token;
    const refreshToken = tokens.refresh_token;
    console.log(accessToken);

    // 取得したトークンを利用して何かを実行するなどの処理を追加する
    const newAuth = new Auth({
        userId: req.session.user_id,
        accessToken: accessToken,
        refreshToken: refreshToken,
    });

    const auth = await newAuth.save();

    // レスポンスとしてアクセストークンとリフレッシュトークンを返す
    res.status(200).json(auth);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
















module.exports = router;