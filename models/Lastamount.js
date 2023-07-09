const mongoose = require("mongoose");

const LastamountSchema = new mongoose.Schema({
    amount: {
        type: Number
    } 
});
















module.exports = mongoose.model("Lastamount", LastamountSchema);