const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  assigned_to: {
    type: Object,
    required: true,
  },
  readings: {
    type: [Object],
  },
});

module.exports = User = mongoose.model("user", UserSchema);
