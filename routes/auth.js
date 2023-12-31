const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Playlist = require("../models/Playlist");
const Auth = require("../models/Auth");
const { google } = require('googleapis');
//const bcrypt = require("bcrypt");
require("dotenv").config();
const axios = require("axios");


// Google OAuth2のクライアント情報
const clientId = process.env.YOUR_CLIENT_ID;
const clientSecret = process.env.YOUR_CLIENT_SECRET;
const redirectUri = process.env.YOUR_REDIRECT_URL;







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
        res.cookie('userId', user._id.toString(),{
          httpOnly: true,
          maxAge: 1000*60*60*24*7,
          secure: true,
          sameSite: "none",
      });
        console.log("headers", res.getHeaders(), {
          httpOnly: false,
        })
        //req.session.user_id = user._id.toString();  ///ここでユーザーIDをセッションに保存している
        
        


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
    //console.log(code);

    const oauth2Client = new google.auth.OAuth2(
        clientId,
        clientSecret,
        redirectUri
    );

    // アクセストークンとリフレッシュトークンを取得
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    console.log(tokens);

    const accessToken = await oauth2Client.getAccessToken();

    


    console.log(accessToken.token);
    console.log(tokens.refresh_token);
    console.log("cookies: ", req.cookies);
    console.log("cookies.userid: ", req.cookies.userId);
    



    // 取得したトークンを利用して何かを実行するなどの処理を追加する
    const newAuth = new Auth({
        userId: req.cookies.userId,
        tokens: JSON.stringify(tokens)
    });

    const auth = await newAuth.save();
    //ここで

    // レスポンスとしてアクセストークンとリフレッシュトークンを返す
    res.status(200).json(auth);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});












module.exports = router;