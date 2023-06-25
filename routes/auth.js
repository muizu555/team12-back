const express = require("express");
const router = express.Router();


router.get("/", (req,res)=> {
    res.send("認証");
})














module.exports = router;