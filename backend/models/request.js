const mongoose = require("mongoose");
const requestSchema = mongoose.Schema({
    accompResp: String,
    accompId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" 
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" 
    },
});

const request = mongoose.model("Request", requestSchema);
module.exports = request;
