const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const adminAuth = require("../../middleware/adminAuth");
// Admin Model
const Admin = require("../../models/Admin");
const Medic = require("../../models/Medic");
const Staff = require("../../models/Staff");
const User = require("../../models/User");

/*
  routes providing functionalities of admin, adding members, removing members
*/

// For registering members /admin/add
router.use("/add", require("./add"));

// For deleting members /admin/delete
router.use("/delete", require("./delete"));

// @route /admin/getAssignedStaff
// @desc get staffs assigned to user
// @access private
router.get("/getAssignedStaffs/:id", adminAuth, (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ msg: "Please enter all fields" });

  User.findOne({ id })
    .select("assigned_to")
    .then((user) => {
      const { medicid, staffid } = user.assigned_to;
      res.json({ medicid, staffid });
    })
    .catch((err) => res.status(400).json({ msg: "User doesn't exist" }));
});

// @route /admin/getAssignedUsers
// @desc get assigned users of staff and medic
// @access private
router.get("/getAssignedUsers/:medicid&:staffid", adminAuth, (req, res) => {
  const { medicid, staffid } = req.params;
  if (!medicid || !staffid)
    return res.status(400).json({ msg: "Please enter all fields" });
  Medic.findOne({ id: medicid })
    .select("assigned_users")
    .then((medic) => {
      Staff.findOne({ id: staffid })
        .select("assigned_users")
        .then((staff) => {
          res.json({
            mediclist: medic.assigned_users,
            stafflist: staff.assigned_users,
          });
        })
        .catch((err) => res.status(400).json({ msg: "Staff doesn't exist" }));
    })
    .catch((err) =>
      res.status(400).json({ msg: "Medical Staff doesn't exist" })
    );
});

// @route /admin/assignUser
// @desc Assign users to staff and medical staff
// @access private
router.put("/assignUser", adminAuth, (req, res) => {
  const { medicid, staffid, mediclist, stafflist } = req.body;
  const medicfilter = { id: medicid };
  const medicupdate = { assigned_users: mediclist };
  Medic.findOneAndUpdate(medicfilter, medicupdate)
    .then((medic) => {
      const stafffilter = { id: staffid };
      const staffupdate = { assigned_users: stafflist };
      Staff.findOneAndUpdate(stafffilter, staffupdate).then((staff) =>
        res.json({ msg: "User added and assigned succesfully" })
      );
    })
    .catch((err) => res.status(500).json({ msg: "Couldn't assign users" }));
});

/*
  routes providing functionalities for admin  profile, changing password
*/

// @route POST admin/profile
// @desc Checking old password
// @access private
router.post("/profile", adminAuth, (req, res) => {
  const { password } = req.body;

  if (!password)
    return res.status(400).json({ msg: "Care entering your current password" });

  Admin.findOne({ id: req.admin.id }).then((admin) => {
    // Validate Password
    bcrypt.compare(password, admin.password).then((isMatch) => {
      if (!isMatch)
        return res
          .status(400)
          .json({ msg: "Current password you entered is wrong" });

      return res.json({ msg: "Current password accepted" });
    });
  });
});

// @route PUT admin/changePassword
// @desc Changing the password
// @access private
router.put("/changePassword", adminAuth, (req, res) => {
  const { password } = req.body;
  if (!password)
    return res.status(400).json({ msg: "The new password please. Sir." });

  const filter = { id: req.admin.id };
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return res.status(500).json({ msg: "Something bad happened" });
    }
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        return res.status(500).json({ msg: "Something happened" });
      }
      const update = { password: hash };
      Admin.findOneAndUpdate(filter, update)
        .then((admin) => res.json({ msg: "Password change success." }))
        .catch((err) =>
          res.status(500).json({ msg: "Couldn't change password" })
        );
    });
  });
});

module.exports = router;
