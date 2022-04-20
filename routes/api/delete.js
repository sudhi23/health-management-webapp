const express = require("express");
const router = express.Router();
const adminAuth = require("../../middleware/adminAuth");

// Admin Model
const Admin = require("../../models/Admin");
// User Model
const User = require("../../models/User");
// Medic Model
const Medic = require("../../models/Medic");
// Staff Model
const Staff = require("../../models/Staff");
// Member Model
const Member = require("../../models/Member");

// @route DELETE /admin/delete/admin/:id
// @desc Delete an admin
// @access Public
router.delete("/admin/:id", adminAuth, (req, res) => {
  const { id } = req.params;

  Member.findOne({ id })
    .then((member) => {
      member.remove().then(() => {
        Admin.findOne({ id }).then((admin) =>
          admin.remove().then(() => res.json({ msg: "Admin deleted" }))
        );
      });
    })
    .catch((err) => res.status(404).json({ msg: "Admin doesn't exist" }));
});

// @route DELETE /admin/delete/user/:id
// @desc Delete an user
// @access Public
router.delete("/user/:id", adminAuth, (req, res) => {
  const { id } = req.params;

  Member.findOne({ id })
    .then((member) => {
      member.remove().then(() => {
        User.findOne({ id }).then((user) =>
          user.remove().then(() => res.json({ msg: "User deleted" }))
        );
      });
    })
    .catch((err) => res.status(404).json({ msg: "User doesn't exist" }));
});

// @route DELETE /admin/delete/medic/:id
// @desc Delete a medical staff
// @access Public
router.delete("/medic/:id", adminAuth, (req, res) => {
  const { id } = req.params;

  Member.findOne({ id })
    .then((member) => {
      member.remove().then(() => {
        Medic.findOne({ id }).then((medic) =>
          medic.remove().then(() => res.json({ msg: "Medical Staff deleted" }))
        );
      });
    })
    .catch((err) =>
      res.status(404).json({ msg: "Medical staff doesn't exist" })
    );
});

// @route DELETE /admin/delete/staff/:id
// @desc Delete a staff
// @access Public
router.delete("/staff/:id", adminAuth, (req, res) => {
  const { id } = req.params;

  Member.findOne({ id })
    .then((member) => {
      member.remove().then(() => {
        Staff.findOne({ id }).then((staff) =>
          staff.remove().then(() => res.json({ msg: "Staff deleted" }))
        );
      });
    })
    .catch((err) => res.status(404).json({ msg: "Staff doesn't exist" }));
});

module.exports = router;
