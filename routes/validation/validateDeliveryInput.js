const Validator = require("validator");

const isEmpty = require("../../utils/isEmpty");

ValidateDeliveryInput = function(data) {
  errors = {};
  data.delivery_details = !isEmpty(data.delivery_details)
    ? data.delivery_details
    : "";
  data.pickup_address = !isEmpty(data.pickup_address)
    ? data.pickup_address
    : "";
  data.delivery_address = !isEmpty(data.delivery_address)
    ? data.delivery_address
    : "";
  data.recipient_phone_number = !isEmpty(data.recipient_phone_number)
    ? data.recipient_phone_number
    : "";

  if (Validator.isEmpty(data.delivery_details)) {
    errors.delivery_details = "Please input Your delivery informations";
  }
  if (Validator.isEmpty(data.pickup_address)) {
    errors.pickup_address = "Please input Your pickup address";
  }
  if (Validator.isEmpty(data.delivery_address)) {
    errors.delivery_address = "Please input Your delivery address";
  }
  if (Validator.isEmpty(data.recipient_phone_number)) {
    errors.recipient_phone_number = "Please input the recipient phone number";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = ValidateDeliveryInput;
