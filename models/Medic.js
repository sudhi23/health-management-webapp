const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const MedicSchema = new Schema({
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
  assigned_users: {
    type: [String],
  },
});

module.exports = User = mongoose.model("medic", MedicSchema);
