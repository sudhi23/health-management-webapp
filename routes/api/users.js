const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const userAuth = require("../../middleware/userAuth");

// User Model
const User = require("../../models/User");

// @route POST user/profile
// @desc Check old password
// @access private
router.post("/profile", userAuth, (req, res) => {
  const { password } = req.body;

  if (!password)
    return res.status(400).json({ msg: "Care entering your current password" });

  User.findOne({ id: req.user.id }).then((user) => {
    // Validate Password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch)
        return res.status(400).json({ msg: "Current password is wrong" });

      return res.json({ msg: "Current password accepted" });
    });
  });
});

// @route PUT user/changePassword
// @desc Change password
// @access private
router.put("/changePassword", userAuth, (req, res) => {
  const { password } = req.body;
  if (!password)
    return res.status(400).json({ msg: "The new password please. Sir." });

  const filter = { id: req.user.id };
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return res.status(500).json({ msg: "Something bad happened" });
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) return res.status(500).json({ msg: "Something happened" });

      const update = { password: hash };
      User.findOneAndUpdate(filter, update)
        .then((user) => res.json({ msg: "Password change success" }))
        .catch((err) =>
          res.status(500).json({ msg: "Couldn't change password" })
        );
    });
  });
});

module.exports = router;
