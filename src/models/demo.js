const mongoose = require("mongoose");

const demoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Demo = mongoose.model("Demo", demoSchema);

module.exports = Demo;
