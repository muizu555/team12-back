const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Playlist = require("../models/Playlist");
const Video = require("../models/Video");
const dayjs = require("dayjs");
const axios = require("axios");
const Auth = require("../models/Auth");
const { google } = require('googleapis');
require("dotenv").config();


const clientId = process.env.YOUR_CLIENT_ID;
const clientSecret = process.env.YOUR_CLIENT_SECRET;
const redirectUri = process.env.YOUR_REDIRECT_URL;

//ここにロジックを書く 最後にres.json(user)を返すのが目標

// utc := 世界標準時
// 日本の時刻にする


//date型をNumber型に変換 (西暦1970年からの秒数)
// publishedAt は世界標準時
function D2Num(dateStr) {
    let datetime = new Date(dateStr);
    /*
    let date9 = new Date(9*60*60*1000);
    let res = Math.floor(Math.abs(datetime + date9) / 1000);
    */
    let res = datetime.getTime();
    res = (res/1000) + 9*60*60;
    console.log("d2num: " + res);
    return res;
}


//durationをNumber型に変換（秒数）
function parseDuration(durationString) {
    const durationRegex = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
    const matches = durationRegex.exec(durationString);
    
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    
    if (matches[1]) {
      hours = parseInt(matches[1]);
    }
    
    if (matches[2]) {
      minutes = parseInt(matches[2]);
    }
    
    if (matches[3]) {
      seconds = parseInt(matches[3]);
    }
    
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    return totalSeconds;
}



router.get("/", async (req, res) => {//ここのエンドポイントどうする問題　/ or /:id

    const user = await User.find({});
    user.sort(function(a, b){
        if(a.amount > b.amount) return -1;
        else if(a.amount < b.amount) return 1;
        else return 0;
    });
    console.log(user);

    //右側のuserの判別
    if(!req.cookies.userId){
        res.status(200).json({user});//ちゃんと型を統一する
    }
    else{
        const realuser = await User.findOne({_id: req.cookies.userId});
 
        console.log("hoge",realuser);
        res.status(200).json({user,realuser});//user2の配列がランキング用、realuserが見てる人を特定している
    }
});




router.get("/getdata", async (req, res) => {
    const user = await User.find({});
    // utc := 世界標準時
    // 日本の時刻にする
    let utc = new Date();
    let currentDate = new Date(utc.getTime()+9*60*60*1000);
    let prevDate = new Date(currentDate.getTime() - 20*60*1000);
    let val = Math.floor(currentDate / 1000);
    let val2 = Math.floor(prevDate / 1000);

    try {
        for(let i = 0;i<user.length;i++){
            if(i>10) break;//10人以上は叩けなくなるから注意
            const playlistId = user[i].playlistId;
            const user2 = await Auth.findOne({userId: user[i]._id});
            const oauth2Client = new google.auth.OAuth2(
                clientId,
                clientSecret,
                redirectUri
            );
            const tokens = user2.tokens;
            oauth2Client.setCredentials(JSON.parse(tokens));
            //
            oauth2Client.on('tokens', async(tokens) => {
                await user2.updateOne({
                    $set: {
                        tokens: JSON.stringify(tokens)
                    },
                })
            });
            const service = google.youtube('v3');
            //console.log("hoge");ここまではいけている
            console.log(playlistId);
            if(playlistId[0] !== 'P' && playlistId[1] !== 'L') {
                await user[i].deleteOne();
                continue;
            }
            

            const getData = await service.playlistItems.list({
                auth: oauth2Client,//ここ問題
                part: "snippet",
                playlistId: playlistId
            }); 
            

            console.log("!!!",getData);
            
            
            //console.log(getData.data.items[0].snippet.publishedAt);
            let pubAt = [];
            let dur = [];
            let total_time = 0;//こいつを一人ごとに出せれば良い
            for(let j = 0; j<getData.data.items.length; j++){
                if(j >10) break;
                const videoId = getData.data.items[j].snippet.resourceId.videoId;
                const publishedAt = getData.data.items[j].snippet.publishedAt;
                pubAt.push(D2Num(publishedAt));//ここで格納
    
                // const getvideo = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, { //これで実際に叩く
                //     params: {
                //         access_token: user2.tokens.access_token,
                //         part: "contentDetails",
                //         id: videoId,
                //     },
                // });

                const getvideo = await service.videos.list({
                    auth: oauth2Client,//ここ問題
                    part: "contentDetails",
                    id: videoId,
                }); 



                const duration = getvideo.data.items[0].contentDetails.duration;
                dur.push(parseDuration(duration));//ここで格納

                console.log(dur);
                console.log("hoge",pubAt);


                if(j===0){
                    if(pubAt[0] < val2){
                        total_time += Math.max(0, Math.min(val, pubAt[0] + dur[0]) - val2);
                        break;
                    }
                    else total_time += Math.min((val - pubAt[0]), dur[0]);
                }
                else{
                    if(pubAt[j] < val2){//これすごい
                        total_time += Math.max(0, Math.min(pubAt[j - 1] - pubAt[j], dur[j]) - (val2 - pubAt[j]));
                        break;
                    }
                    //ここが本当の計算
                    total_time += Math.min(pubAt[j - 1] - pubAt[j], dur[j]);
                }
                const newVideo = new Video({
                    publishedAt: publishedAt,
                    videoId: videoId,
                    duration: duration
                });
                await newVideo.save();
                console.log(j);
                console.log(total_time);
            }
            console.log(total_time);
            console.log("hoge",user[i].amount);


            let hour = currentDate.getHours();
            hour = (hour - 9 + 24) % 24;
            let minute = currentDate.getMinutes();

            console.log("HOUR: " + hour);
            console.log("MINUTE" + minute);
            
            if(user[i].amount===undefined){
                /*
                await user[i].updateOne({
                    $set: {
                        amount: total_time,//投稿のobjectIdを挿入している。
                    },
                });
                */
                if(hour == 0 && 0 <= minute && minute < 20){
                    await user[i].updateOne({
                        $set: {
                            amount: 0,//投稿のobjectIdを挿入している。
                        },
                    });
                }
                else{
                    await user[i].updateOne({
                        $set: {
                            amount: total_time,//投稿のobjectIdを挿入している。
                        },
                    });
                }
            }
            else{
                if(hour == 0 && 0 <= minute && minute < 20){
                    await user[i].updateOne({
                        $set: {
                            amount: 0,//投稿のobjectIdを挿入している。
                        },
                    });
                }
                else{
                    await user[i].updateOne({
                        $set: {
                            amount: total_time + user[i].amount,//投稿のobjectIdを挿入している。
                        },
                    });
                }
            }
            console.log(user[i].amount);
            //ここで実際にDBに入れる。total_timeはNumber型
            
        }

        //userが出来上がった配列//dbに保存されている
        const user2 = user;
        user2.sort(function(a, b){
            if(a.amount > b.amount) return -1;
            else if(a.amount < b.amount) return 1;
            else return 0;
        });
    
        await user2[0].updateOne({
            $set: {
                rank: "1",//投稿のobjectIdを挿入している。
            },
        })
        let prev = 1;
        for(let i = 1; i < user2.length; i++){
            if(user2[i].amount < user2[i - 1].amount){
                //(i + 1).toString();
                console.log("h", i + 1);
                await user2[i].updateOne({
                    $set: {
                        rank: String(i + 1),//投稿のobjectIdを挿入している。(prev).toString();
                    },
                })
                prev = i + 1;
            }
            else{
                await user2[i].updateOne({
                    $set: {
                        rank: String(prev),//投稿のobjectIdを挿入している。(prev).toString();
                    },
                })   
            }
        }
        console.log("aaa",user2);//ランクが格納されたDB
    

        res.status(200).json("成功しました");
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});







//ここに実際に20分おきに呼び出す関数をかく






module.exports = router