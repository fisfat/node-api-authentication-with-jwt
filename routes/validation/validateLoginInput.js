const Validator = require("validator");
const isEmpty = require("../../utils/isEmpty");

module.exports = function validateLoginInput(data) {
  var errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "This field requires a valid email";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "The email field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "The password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
