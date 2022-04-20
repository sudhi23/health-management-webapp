const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const StaffSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  assigned_users: {
    type: [String],
  },
});

module.exports = Staff = mongoose.model("staff", StaffSchema);
