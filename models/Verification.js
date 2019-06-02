const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VerificationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  type: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  }
});
module.exports = Verification = mongoose.model(
  "verifications",
  VerificationSchema
);
