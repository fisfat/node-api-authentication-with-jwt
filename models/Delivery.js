const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DeliverySchema = new Schema({
  requestee: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  delivery_details: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  pickup_address: {
    type: String
  },
  delivery_address: {
    type: String
  },
  recipient_phone_number: {
    type: String,
    reuired: true
  },
  delivery_code: {
    type: String,
    required: true
  },
  request_date: {
    type: Date,
    default: Date.now
  },
  dispatch_date: {
    type: Date
  },
  delivery_date: {
    type: Date
  }
});
module.exports = Delivery = mongoose.model("deliveries", DeliverySchema);
