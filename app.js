const express = require("express");
const app = express();


app.use(express.json());//res.json(data)などを使う時のためのもの

const PORT = 80;

app.use(express.static("public"));





app.get("/hello/:name", (req, res) => {
    console.log(req.params.name);//ターミナルに表示させる
    res.send("OK\n");
});





app.listen(PORT, () =>{
    console.log("server running");
})
