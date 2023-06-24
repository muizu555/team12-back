const express = require("express");
const app = express();




app.use(express.static("public"));
app.use(express.json());//res.json(data)などを使う時のためのもの

const PORT = 3000;

const userRoute = require("./routes/user");


app.get("/", (req,res) =>{
    res.send("Hello");
})





app.get("/hello/:name", (req, res) => {
    console.log(req.params.name);//ターミナルに表示させる
    res.send("OK\n");
});






app.use("/api/v1/users", userRoute);


app.listen(PORT, () =>{
    console.log("server running");
})
