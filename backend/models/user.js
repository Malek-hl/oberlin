const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const userSchema= mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true},
    role: String,
    adress: String,
    tel: Number,
    exp: Number,
    pwd: String,
    avatar: String,
    status: String,
    cv: String
});
userSchema.plugin(uniqueValidator);

// Model name "User" => PascalCase == single/majuscule
const user= mongoose.model("User", userSchema);

module.exports= user;