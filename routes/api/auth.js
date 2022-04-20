const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const adminAuth = require("../../middleware/adminAuth");
const userAuth = require("../../middleware/userAuth");
const medicAuth = require("../../middleware/medicAuth");
const staffAuth = require("../../middleware/staffAuth");

// Admin Model
const Admin = require("../../models/Admin");
// User Model
const User = require("../../models/User");
// Medic Model
const Medic = require("../../models/Medic");
// Staff Model
const Staff = require("../../models/Staff");

// @route POST /auth/admin
// @desc Auth admin
// @access Public
router.post("/admin", (req, res) => {
  const { id, password } = req.body;

  // Simple validation
  if (!id || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing admin
  Admin.findOne({ id }).then((admin) => {
    if (!admin) return res.status(400).json({ msg: "Admin does not exists" });

    // Validate password
    bcrypt.compare(password, admin.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      jwt.sign(
        { id: admin.id },
        config.get("adminSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;

          res.json({
            admintoken: token,
            admin: {
              id: admin.id,
              name: admin.name,
            },
          });
        }
      );
    });
  });
});

// @route POST /auth/user
// @desc Auth user
// @access Public
router.post("/user", (req, res) => {
  const { id, password } = req.body;

  // Simple validation
  if (!id || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  User.findOne({ id }).then((user) => {
    if (!user) return res.status(400).json({ msg: "User does not exists" });

    // Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      jwt.sign(
        { id: user.id },
        config.get("userSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;

          res.json({
            usertoken: token,
            user: {
              id: user.id,
              name: user.name,
              readings: user.readings,
            },
          });
        }
      );
    });
  });
});

// @route POST /auth/medic
// @desc Auth medic
// @access Public
router.post("/medic", (req, res) => {
  const { id, password } = req.body;

  // Simple validation
  if (!id || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing admin
  Medic.findOne({ id }).then((medic) => {
    if (!medic)
      return res.status(400).json({ msg: "Medical Staff does not exists" });

    // Validate password
    bcrypt.compare(password, medic.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      jwt.sign(
        { id: medic.id },
        config.get("medicSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;

          res.json({
            medictoken: token,
            medic: {
              id: medic.id,
              name: medic.name,
              assigned_users: medic.assigned_users,
            },
          });
        }
      );
    });
  });
});

// @route POST /auth/staff
// @desc Auth staff
// @access Public
router.post("/staff", (req, res) => {
  const { id, password } = req.body;

  // Simple validation
  if (!id || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing staff
  Staff.findOne({ id }).then((staff) => {
    if (!staff) return res.status(400).json({ msg: "Staff does not exists" });

    // Validate password
    bcrypt.compare(password, staff.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      jwt.sign(
        { id: staff.id },
        config.get("staffSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;

          res.json({
            stafftoken: token,
            staff: {
              id: staff.id,
              name: staff.name,
              assigned_users: staff.assigned_users,
            },
          });
        }
      );
    });
  });
});

// @route GET /auth/getAdmin
// @desc Get admin
// @access Private
router.get("/getAdmin", adminAuth, (req, res) => {
  Admin.findOne({ id: req.admin.id })
    .select("-password")
    .then((admin) => {
      if (!admin)
        return res
          .status(500)
          .json({ msg: "The admin may have been deleted from the database" });
      res.json(admin);
    })
    .catch((err) => res.status(500).json({ msg: "Not found but why !" }));
});

// @route GET /auth/getUser
// @desc Get user
// @access Private
router.get("/getUser", userAuth, (req, res) => {
  User.findOne({ id: req.user.id })
    .select("-password")
    .then((user) => res.json(user));
});

// @route GET /auth/getMedic
// @desc Get medical staff
// @access Private
router.get("/getMedic", medicAuth, (req, res) => {
  Medic.findOne({ id: req.medic.id })
    .select("-password")
    .then((medic) => res.json(medic));
});

// @route GET /auth/getStaff
// @desc Get staff
// @access Private
router.get("/getStaff", staffAuth, (req, res) => {
  Staff.findOne({ id: req.staff.id })
    .select("-password")
    .then((staff) => res.json(staff));
});

module.exports = router;
