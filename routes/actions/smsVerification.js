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
      body: "This is the ship that made the Kessel Run in fourteen parsecs?",
      from: twilio_phone_number,
      to: "+2347067285492"
    })
    .then(message => {
      if (message.errorCode === null) {
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
