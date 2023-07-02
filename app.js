const express = require("express");
const app = express();




app.use(express.static("public"));
app.use(express.json());//res.json(data)などを使う時のためのもの

const PORT = 3000;

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");



app.get("/", (req,res) =>{
    res.send("Hello");
})

app.get("/hello", (req,res) =>{
    res.send("こんにちは");
})











app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);


app.listen(PORT, () =>{
    console.log("server running");
})
