var EventEmitter = require("events");
const sendVerificationSms = require("../actions/smsVerification");

var smsEvent = new EventEmitter();

smsEvent.on("sendVerificationSms", sendVerificationSms);
// ee.emit("message", "hello world");
module.exports = smsEvent;
