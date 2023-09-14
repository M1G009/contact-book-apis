const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const adminSchema = new Schema({
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

const ADMIN = mongoose.model("admin" , adminSchema)

module.exports = ADMIN