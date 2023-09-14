const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fname : {
    type : String,
    require : true
  },
  lname : {
    type : String,
    require : true
  },
  uname : {
    type : String,
    require : true,
    unique : true,
    min : 5,
    max : 15
  },
  password : {
    type : String,
    require : true
  },
  contact : {
    type : Number,
    require : true
  },
  email : {
    type : String,
    require : true
  },
});

const USER = mongoose.model("user" , userSchema)

module.exports = USER