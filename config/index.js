require("dotenv").config();
const Sentry = require("@sentry/node");
Sentry.init({ dsn: process.env.SENTRY_CONFIG });

module.exports = {
  port: process.env.port,
  node_env: process.env.NODE_ENV,
  mongoURI: process.env.DB_CONNECTION,
  secret: process.env.SECRET,
  Sentry: Sentry,
  sid: process.env.TWILIO_ACCOUNT_SID,
  twilio_token: process.env.TWILIO_AUTH_TOKEN,
  twilio_phone_number: process.env.TWILIO_PHONE_NUMBER
};
