const {
  Sentry,
  twilio_token,
  twilio_phone_number,
  sid
} = require("../../config");
const client = require("twilio")(sid, twilio_token);

module.exports = function sendVerificationSms(code = "", phone_number = "") {
  const errors = {};
  client.messages
    .create({
      body: `Your easyTransit verification code is ${code}`,
      from: twilio_phone_number,
      to: phone_number
    })
    .then(message => {
      if (message.errorCode !== null) {
        errors.smsVerification = "There was a problem sending the sms";
      }
    })
    .catch(err => {
      errors.smsVerification = "There was a problem sending the sms";
      Sentry.captureException(err);
    });

  return {
    errors
  };
};
