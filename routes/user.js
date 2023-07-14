const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Playlist = require("../models/Playlist");
const Video = require("../models/Video");
const dayjs = require("dayjs");
const axios = require("axios");
const Auth = require("../models/Auth");

//ここにロジックを書く 最後にres.json(user)を返すのが目標



router.get("", async (req, res) => {//ここのエンドポイントどうする問題　/ or /:id

});





router.get("/getdata", async (req, res) => {

    try {
        const user = await Auth.findOne({userId: req.cookies.userId});
        const user2 = await User.findOne({_id: req.cookies.userId});
        console.log(user);
        console.log("hoge",user2);
        const playlistId = user2.playlistId;
        //console.log(user.accessToken);
        
        const getData = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems`, { //これで実際に叩く
            params: {
                access_token: user.accessToken,
                part: "snippet",
                playlistId: playlistId
            },
        });
        const videoId = getData.data.items[0].snippet.resourceId.videoId;
        const publishedAt = getData.data.items[0].snippet.publishedAt;

        const getvideo = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, { //これで実際に叩く
            params: {
                access_token: user.accessToken,
                part: "contentDetails",
                id: videoId,
            },
        });

        console.log(publishedAt);
        console.log(getvideo.data.items[0].contentDetails.duration);
        res.status(200).json(getData.data.items[0].snippet.publishedAt);//多分for文を使うので、添字はiになるはず

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});

router.get("/getvideo", async(req, res) => {
    
    
    const getvideo = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, { //これで実際に叩く
            params: {
                access_token: hoge.accessToken,
                part: "contentDetails",
                id: "WE9Q7yo-Tmg",
            },
        });
        
    console.log(getvideo.data.items[0].contentDetails.duration);
    res.status(200).json(getvideo.data.items[0].contentDetails.duration);   

})












setInterval(myCallback, 1000 * 60 * 20, Playlist, User, 20);

///結局for文で回す必要がある









async function myCallback(Playlist, User, interval) {//できる
    await Playlist.deleteMany({});//ここで今までのplaylistを全て消去している
    //ここで登録している全てのユーザーに対してapiを叩く
    const user = await User.find({});//全ユーザーを取ってくる
    for (let i = 0; i < user.length; i++) {//ここで一人ずつ叩いている
        const userId = user[i]._id;
        //ここでuserIdを持った状態で叩く、多分ここはtokenになるはずである
        const data = await fetch("googleエンドポイント");//個人のデータはとってこれている
        for (let i = 0; i < data.items.length; i++) {
            const publishedAt = data.items[i].snippet.publishedAt;
            const videoId = data.items[i].snippet.resourceId.videoId;
            const find = await Video.exists({ videoId: videoId });//
            if (find === null) {
                continue;
            }
            const data2 = await fetch("googleのエンドポイント");
            const duration = data2.items.contentDetails.duration;
            const Video = new video({ publishedAt: publishedAt, duration: duration });
            const newVideo = await Video.save();
            const find2 = await Playlist.exists({ PlaylistId: user.PlaylistId })
            if (find2 === null) {
                const newPlayList = new Playlist({ PlaylistId: user.PlaylistId });
                const finPlayList = await newPlayList.save();
                await finPlayList.updateOne({
                    $push: {
                        items: newVideo._id,//投稿のobjectIdを挿入している。
                    },
                });//ここでfinPlayListが完成形
            }
            await Playlist.updateOne({
                $push: {
                    items: newVideo._id,
                },
            });
        }
    }















}
























//ここに実際に20分おきに呼び出す関数をかく






module.exports = router