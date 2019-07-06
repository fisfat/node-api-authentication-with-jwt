const sgMail = require("@sendgrid/mail");
const { Sentry, sendgridApiKey } = require("../../config");
sgMail.setApiKey(sendgridApiKey);

module.exports = function sendEmail(subject = "", to = "", content = "") {
  const errors = {};
  const msg = {
    to: to,
    from: "no-reply@easytransit.ng",
    subject: subject,
    // text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>"
  };

  try {
    sgMail.send(msg);
  } catch (error) {
    errors.sendEmail = "Issues with our email services";
    Sentry.captureException(error);
  }
  return {
    errors
  };
};
