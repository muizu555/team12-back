const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./db/connect");
require("dotenv").config();
const session = require("express-session");



//app.use(express.static("public"));
app.use(express.json());//res.json(data)などを使う時のためのもの
app.use(cors())
const PORT = 8000;//routing設計を変えました

const sessionOption = {//resaveのエラーを消した
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,//way to save session
    cookie: {
        httpOnly: true,
        maxAge: 1000*60*60*24*7,
    }
};


app.use(session( sessionOption ));

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");

app.get("/viewcount", (req, res) => {//req.sessionはただの入れ物 ここをポートフォリを作るときに取り入れたい 1回expressを止めちゃうとサーバサイドに保存しているので０になる
    if(req.session.count){//countは勝手に作った
        req.session.count += 1;
    }
    else{
        req.session.count = 1;
    }
    res.send(`あなたは${req.session.count}回このページを見ました。`)
});




app.get("/", (req,res) =>{
    res.send("Hello");
})


app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);



const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(PORT, () => {
            console.log("server runnning");
        });
    } catch (err) {
        console.log(err);
    }
};

start();






