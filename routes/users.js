const router = require("express").Router();
const validateSigUpInput = require("./validation/validateUserInput");
const validateLoginInput = require("./validation/validateLoginInput");
const { Sentry, secret } = require("../config");
const bcrypt = require("bcryptjs");
const makeCode = require("../utils/codeGen");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const { smsEvent, emailEvent } = require("./events");

const User = require("../models/User");
const Verification = require("../models/Verification");

router.post("/", (req, res) => {
  const created = {};
  const { errors, isValid } = validateSigUpInput(req.body);
  const { name, email, phone_number, role, password } = req.body;
  if (!isValid) {
    res.status(400).send(errors);
  }
  const query = { email };
  User.findOne(query).then(user => {
    if (user) {
      errors.email = "The email is in use";
      res.status(400).send(errors);
    } else {
      try {
        const newUser = new User({
          name,
          email,
          phone_number,
          role: "USER",
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                res.json(user);
              })
              .catch(err => {
                Sentry.captureException(err);
              });
          });
        });
        verify = new Verification({
          user: newUser._id,
          type: "Phone",
          code: makeCode(6)
        }).save();
      } catch (error) {
        Sentry.captureException(error);
      }
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email, password } = req.body;
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(400).json(errors);
    } else {
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: user.id,
            name: user.name,
            phone_number: user.phone_number,
            phone_verified: user.phone_verify,
            email_verified: user.email_verify
          };
          jwt.sign(payload, secret, { expiresIn: 3600 }, (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          });
        } else {
          errors.password = "password incorrect";
          return res.status(401).json(errors);
        }
      });
    }
  });
});

router.post(
  "/request_code",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    const { phone_number } = req.user;
    const user = req.user._id;

    Verification.findOne({ user })
      .then(result => {
        const { code } = result;
        smsEvent.emit("sendVerificationSms", code, phone_number);
      })
      .catch(err => {
        errors.sms = "Sorry, we ran into some errors";
        res.status(400).send(errors);
        Sentry.captureException(err);
      });
  }
);

//compare code
router.post(
  "/verify_code",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    const user = req.user._id;
    const { code_input } = req.body;

    Verification.findOne({ user })
      .then(result => {
        const { code } = result;
        if (code !== code_input) {
          errors.verification = "Code doesn't match";
          res.status(400).json(errors);
        } else {
          Verification.findOneAndDelete({ user });
          User.findOne({ _id: user }).then(new_user => {
            new_user.phone_verify = true;
            emailEvent.emit(
              "sendEmail",
              "Hearty welcome to EasyTransit",
              new_user.email
            );
            new_user.save().then(user => res.json(user));
          });
        }
      })
      .catch(err => {
        errors.sms = "Sorry, we ran into some errors";
        res.status(400).send(errors);
        Sentry.captureException(err);
      });
  }
);

module.exports = router;
