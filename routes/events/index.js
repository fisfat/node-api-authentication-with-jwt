var EventEmitter = require("events");
const sendVerificationSms = require("../actions/smsVerification");
const sendEmail = require("../actions/emailVerification");

const smsEvent = new EventEmitter();
const emailEvent = new EventEmitter();

smsEvent.on("sendVerificationSms", sendVerificationSms);
emailEvent.on("sendEmail", sendEmail);
// ee.emit("message", "hello world");
module.exports = { smsEvent, emailEvent };
