const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({//userIdはobjectIdでひとまずは良いのではないか userスキーマに総視聴時間の合計のプロパティがあった方が良さそう
    username: {
        type: String,
        required: true,
        min: 3,//placeholderで3~20という風に表示してほしい
        max: 20,
        unique: true,
    },
    
    followers: {//もし、フォロー、フォロワーの中だけしかランキングを見せたくないという時
        type: Array,
        default: [],
    },
    followings: {
        type: Array,
        default: [],
    },
    rank: {
        type: String,
    },
    amount: {//総再生時間、その日の 12時くらいにその日のデータを全て消したいよね
        type: String,
    },
    desc: {//もし概要欄などを書く場合
        type: String,
        max: 70,
    },
},

  {timestamps: true }//データを格納した日付と時間を自動的に格納することができる。
);

module.exports = mongoose.model("User", UserSchema);





