const router = require("express").Router();
const validateSigUpInput = require("./validation/validateUserInput");
const validateLoginInput = require("./validation/validateLoginInput");
const { Sentry, secret } = require("../config");
const sgMail = require("@sendgrid/mail");
const bcrypt = require("bcryptjs");
const makeCode = require("../utils/codeGen");
const jwt = require("jsonwebtoken");

const smsEvent = require("./events");

const User = require("../models/User");
const Verification = require("../models/Verification");

router.post("/", (req, res) => {
  const created = {};
  const { errors, isValid } = validateSigUpInput(req.body);
  const { name, email, phone_number, role, password } = req.body;
  console.log(req.body);
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
          const payload = { id: user.id, name: user.name };
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

module.exports = router;
