const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./db/connect");
require("dotenv").config();
const session = require("express-session");
const cookieParser = require('cookie-parser')





//app.use(express.static("public"));
app.use(express.json());//res.json(data)などを使う時のためのもの

app.use(cors({
    origin: ["http://localhost:3000", "https://team12-front.vercel.app"],
    credentials: true
}));

/*
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    next()
})
*/
app.use(cookieParser());
app.set('trust proxy', 1);

const PORT = 8000;//routing設計を変えました

const sessionOption = {//resaveのエラーを消した
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,//way to save session
    cookie: {
        httpOnly: true,
        maxAge: 1000*60*60*24*7,
        secure: true,
        sameSite: "none",
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






