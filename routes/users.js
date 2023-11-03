const mongoose =  require("mongoose");
const passport = require("passport");
const plm = require('passport-local-mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/SOCIALMEDIA");

const userSchema = mongoose.Schema({
  username : String,
  email : String,
  password : String,
  likes :{
    type: Array,
    default : []
  }
});

userSchema.plugin(plm);

module.exports = mongoose.model("user", userSchema);