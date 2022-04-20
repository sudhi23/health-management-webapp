const express = require("express");
const router = express.Router();

const Test = require("../../models/Test");

// @route GET tests/allid

router.get("/allid", (req, res) => {
  Test.find()
    .select("id")
    .then((tests) => res.json(tests))
    .catch((err) => res.status(500).json({ msg: "Our Bad" }));
});

// @route GET tests/getReading/:id

router.get("/getReading/:id", (req, res) => {
  Test.findOne({ id: req.params.id })
    .select("readings")
    .then((test) => res.json(test))
    .catch((err) => res.status(400).json({ msg: "Bad request" }));
});

module.exports = router;
