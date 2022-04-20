const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const medicAuth = require("../../middleware/medicAuth");

// Medic Model
const Medic = require("../../models/Medic");
// User Model
const User = require("../../models/User");

// @route GET /medic/prescript/id
// @desc Get readings for user
// @access public
router.get("/getUser/:id", medicAuth, (req, res) => {
  const { id } = req.params;
  User.findOne({ id })
    .select("readings")
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json({ msg: "User not found" }));
});

// @route   PUT /medic/prescript
// @desc    Add prescription for user
// @access  public
router.put("/prescript", medicAuth, (req, res) => {
  const { id, readings } = req.body;
  const filter = { id };
  const update = { readings };
  User.findOneAndUpdate(filter, update)
    .then((user) => res.json({ msg: "Prescribed succesfully" }))
    .catch((err) => res.status(500).json({ msg: "Couldn't prescribe" }));
});

// @route POST medic/profile
// @desc Check old password
// @access private
router.post("/profile", medicAuth, (req, res) => {
  const { password } = req.body;

  if (!password)
    return res.status(400).json({ msg: "Care entering your current password" });

  Medic.findOne({ id: req.medic.id }).then((medic) => {
    // Validate Password
    bcrypt.compare(password, medic.password).then((isMatch) => {
      if (!isMatch)
        return res.status(400).json({ msg: "Current password is wrong" });

      return res.json({ msg: "Current password accepted" });
    });
  });
});

// @route PUT medic/changePassword
// @desc Change password
// @access private
router.put("/changePassword", medicAuth, (req, res) => {
  const { password } = req.body;
  if (!password)
    return res.status(400).json({ msg: "The new password please. Sir." });

  const filter = { id: req.medic.id };
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return res.status(500).json({ msg: "Something bad happened" });
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) return res.status(500).json({ msg: "Something happened" });

      const update = { password: hash };
      Medic.findOneAndUpdate(filter, update)
        .then((medic) => res.json({ msg: "Password change success" }))
        .catch((err) =>
          res.status(500).json({ msg: "Couldn't change password" })
        );
    });
  });
});

module.exports = router;
