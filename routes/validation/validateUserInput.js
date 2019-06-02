const Validator = require("validator");

const isEmpty = require("../../utils/isEmpty");

module.exports = function validateSigUpInput(data) {
  const errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.phone_number = !isEmpty(data.phone_number) ? data.phone_number : "";
  data.role = !isEmpty(data.role) ? data.role : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "The name field has to be between 2 & 30 characters";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "This field requires a valid email";
  }

  if (Validator.isEmpty(data.phone_number)) {
    errors.phone_number = "The phone number field is required!";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "The email field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "The password field is required";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "The confirm password field is required";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "The password fields must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
