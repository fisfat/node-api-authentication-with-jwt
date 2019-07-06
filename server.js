const app = require("express")();
const bodyParser = require("body-parser");

const users = require("./routes/users");
const deliveries = require("./routes/delivery");

const mongoose = require("mongoose");
const passport = require("passport");

const { port, Sentry, mongoURI } = require("./config");

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true
  })
  .then(() => console.log("connected to db"))
  .catch(err => Sentry.captureException(err));

app.use(passport.initialize());

require("./config/passport")(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/users", users);
app.use("/api/deliveries", deliveries);

app.listen(port, () => console.log(`server started on port ${port}`));
