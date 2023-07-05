const express = require("express");
const router = express.Router();

router.get("/",(req, res) => {
    try {
        res.send("ユーザー情報を取得しました")
    } catch (err) {
        return res.status(500).json(err);
    }
})

    












module.exports = router