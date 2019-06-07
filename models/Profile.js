const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  address: {
    type: String
  },
  alternative_phone_number: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = Profile = mongoose.model("profiles", ProfileSchema);
