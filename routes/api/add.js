const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const adminAuth = require("../../middleware/adminAuth");

// Admin Model
const Admin = require("../../models/Admin");
// User Model
const User = require("../../models/User");
// Medic Model
const Medic = require("../../models/Medic");
// Staff Model
const Staff = require("../../models/Staff");
//
const Member = require("../../models/Member");

// @route POST /admin/add/admin
// @desc Register new admin
// @access Private
router.post("/admin", adminAuth, (req, res) => {
  const { name, id, password } = req.body;

  // Simple validation
  if (!name || !id || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing member
  Member.findOne({ id }).then((member) => {
    if (member)
      return res
        .status(400)
        .json({ msg: "Member with same id already exists" });

    const newMember = new Member({
      id,
    });

    newMember
      .save()
      .then((member) => {
        const newAdmin = new Admin({
          name,
          id,
          password,
        });

        // Create salt and hash
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newAdmin.password, salt, (err, hash) => {
            if (err) throw err;
            newAdmin.password = hash;
            newAdmin.save().then((admin) => {
              res.json({
                msg: "Admin succesfully added",
              });
            });
          });
        });
      })
      .catch((err) => {
        res.status(500).json({ msg: "Admin could not be added" });
      });
  });
});

// @route POST /admin/add/user
// @desc Register new user
// @access Private
router.post("/user", adminAuth, (req, res) => {
  const { name, id, password, medicid, staffid } = req.body;

  // Simple validation
  if (!name || !id || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing member
  Member.findOne({ id }).then((member) => {
    if (member)
      return res
        .status(400)
        .json({ msg: "Member with same id already exists" });

    const newMember = new Member({
      id,
    });

    newMember
      .save()
      .then((member) => {
        const newUser = new User({
          name,
          id,
          password,
          assigned_to: { medicid, staffid },
        });

        // Create salt and hash
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save().then((user) => {
              res.json({
                msg: "User succesfully added",
              });
            });
          });
        });
      })
      .catch((err) => {
        res.status(500).json({ msg: "User could not be added" });
      });
  });
});

// @route POST /admin/add/medic
// @desc Register new medical staff
// @access Private
router.post("/medic", adminAuth, (req, res) => {
  const { name, id, password } = req.body;

  // Simple validation
  if (!name || !id || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing member
  Member.findOne({ id }).then((member) => {
    if (member)
      return res
        .status(400)
        .json({ msg: "Member with same id already exists" });

    const newMember = new Member({
      id,
    });

    newMember
      .save()
      .then((member) => {
        const newMedic = new Medic({
          name,
          id,
          password,
        });

        // Create salt and hash
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newMedic.password, salt, (err, hash) => {
            if (err) throw err;
            newMedic.password = hash;
            newMedic.save().then((medic) => {
              res.json({
                msg: "Medical Staff succesfully added",
              });
            });
          });
        });
      })
      .catch((err) => {
        res.status(500).json({ msg: "Admin could not be added" });
      });
  });
});

// @route POST /admin/add/staff
// @desc Register new staff
// @access Private
router.post("/staff", adminAuth, (req, res) => {
  const { name, id, password } = req.body;

  // Simple validation
  if (!name || !id || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing member
  Member.findOne({ id }).then((member) => {
    if (member)
      return res
        .status(400)
        .json({ msg: "Member with same id already exists" });

    const newMember = new Member({
      id,
    });

    newMember
      .save()
      .then((member) => {
        const newStaff = new Staff({
          name,
          id,
          password,
        });

        // Create salt and hash
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newStaff.password, salt, (err, hash) => {
            if (err) throw err;
            newStaff.password = hash;
            newStaff.save().then((staff) => {
              res.json({
                msg: "Staff succesfully added",
              });
            });
          });
        });
      })
      .catch((err) => {
        res.status(500).json({ msg: "Admin could not be added" });
      });
  });
});

module.exports = router;
