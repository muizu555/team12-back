const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Playlist = require("../models/Playlist");
const Video = require("../models/Video");
const dayjs = require("dayjs");


//ここにロジックを書く 最後にres.json(user)を返すのが目標



router.get("/:id",async(req, res) => {

})




setInterval(myCallback, 1000*60*20, Playlist, User, 20);

async function myCallback (Playlist, User, interval){//できる
    await Playlist.deleteMany({});//ここで今までのplaylistを全て消去している
    //ここで登録している全てのユーザーに対してapiを叩く
    const user  = await User.findById(req.params.id);
    console.log(user.PlaylistId);
    const data = await fetch("googleエンドポイント");//個人のデータはとってこれている
    for(let i =0; i<data.items.length;i++){
        const publishedAt = data.items[i].snippet.publishedAt;
        const videoId = data.items[i].snippet.resourceId.videoId;
        const find = await Video.exists({ videoId: videoId });//
        if(find === null){
            continue;
        }
        const data2 = await fetch("googleのエンドポイント");
        const duration = data2.items.contentDetails.duration;
        const Video = new video({ publishedAt: publishedAt, duration: duration});
        const newVideo = await Video.save();
        

        


    }
    
    const newPlayList= new Video(data);
}
















//ここに実際に20分おきに呼び出す関数をかく

    












module.exports = router