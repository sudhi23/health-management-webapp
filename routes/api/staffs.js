const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const staffAuth = require("../../middleware/staffAuth");

// Staff Model
const Staff = require("../../models/Staff");
// User Model
const User = require("../../models/User");

// @route   GET /staff/addReading/id
// @desc    Get readings for user
// @access  public
router.get("/addReading/:id", staffAuth, (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ msg: "Please select user" });
  User.findOne({ id })
    .select("readings")
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json({ msg: "User not found" }));
});

// @route   PUT /staff/addReading
// @desc    Add readings for user
// @access  public
router.put("/addReading", staffAuth, (req, res) => {
  const { id, readings } = req.body;
  const filter = { id };
  const update = { readings };
  User.findOneAndUpdate(filter, update)
    .then((user) => res.json({ msg: "Added readings succesfully" }))
    .catch((err) => {
      msg: "Couldn't add readings";
    });
});

// @route POST staff/profile
// @desc Check old password
// @access private
router.post("/profile", staffAuth, (req, res) => {
  const { password } = req.body;

  if (!password)
    return res.status(400).json({ msg: "Care entering your current password" });

  Staff.findOne({ id: req.staff.id }).then((staff) => {
    // Validate Password
    bcrypt.compare(password, staff.password).then((isMatch) => {
      if (!isMatch)
        return res.status(400).json({ msg: "Current password is wrong" });

      return res.json({ msg: "Current password accepted" });
    });
  });
});

// @route PUT user/changePassword
// @desc Change password
// @access private
router.put("/changePassword", staffAuth, (req, res) => {
  const { password } = req.body;
  if (!password)
    return res.status(400).json({ msg: "The new password please. Sir." });

  const filter = { id: req.staff.id };
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return res.status(500).json({ msg: "Something bad happened" });
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) return res.status(500).json({ msg: "Something happened" });

      const update = { password: hash };
      Staff.findOneAndUpdate(filter, update)
        .then((staff) => res.json({ msg: "Password change success" }))
        .catch((err) =>
          res.status(500).json({ msg: "Couldn't change password" })
        );
    });
  });
});

module.exports = router;
