const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const phoneSchema = new Schema({
  fname : {
    type : String,
    require : true
  },
  lname : {
    type : String,
    require : true
  },
  contact : {
    type : String,
    require : true
  },
  city : {
    type : String,
    require : true
  },
  country : {
    type : String,
    require : true
  },
  user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }
});

const PHONE = mongoose.model("phonebook" , phoneSchema)

module.exports = PHONE  