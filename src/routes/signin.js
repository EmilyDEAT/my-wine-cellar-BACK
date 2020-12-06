const express = require("express");
const connection = require("../helper/config");
const router = express.Router();
const bcrypt = require("bcryptjs");

router.post("/", (req, res) => {
  const formData = req.body;

  if (!formData.email) {
    return res.status(400).send("Email required");
  }
  if (!formData.password && !formData.passwordConfirm) {
    return res.status(400).send("Password required");
  }

  const emailRegEx = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
  if (!emailRegEx.test(formData.email)) {
    return res.status(400).send("Unvalid email");
  }

  if (
    formData.password.length < 8 ||
    /[a-zA-Z]/.test(formData.password) === false ||
    /[0-9]/.test(formData.password) === false
  ) {
    return res
      .status(400)
      .send("The password should have 8 characters (letters and numbers)");
  }
  if (formData.password !== formData.passwordConfirm) {
    return res.status(400).send("Two different passwords provided");
  }
  formData.password = bcrypt.hashSync(formData.password, 12);
  delete formData.passwordConfirm;

  connection.query(
    "SELECT id FROM user WHERE email = ? LIMIT 1",
    [formData.email],
    (err, result) => {
      if (err) {
        res
          .status(500)
          .send("Service unavailable. Try again later.");
      } else {
        if (result.length > 0) {
          res.status(403).send("This email address is already used.")
        } else {
          connection.query(
            "INSERT INTO user SET ?",
            [formData],
            (err, result) => {
              if (err) {
                res.status(500).send("Unable to add user. Try again later.")
              } else {
                res.status(200).send("user created succesfully.")
              }
            }
          )
        }
      }
    }
  );
});

module.exports = router;
