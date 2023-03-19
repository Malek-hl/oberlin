const mongoose = require("mongoose");
const pubSchema = mongoose.Schema({
    title: String,
    description: String,
    status: String,
    accompReq: String,
    accompId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" 
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" 
    },
});

const pub = mongoose.model("Pub", pubSchema);
module.exports = pub;
