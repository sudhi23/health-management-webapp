const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  readings: {
    type: [Object],
  },
});

module.exports = Test = mongoose.model("test", TestSchema);
