const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true,
  },
});

module.exports = Member = mongoose.model("member", MemberSchema);
