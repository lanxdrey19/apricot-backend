const mongoose = require("mongoose");

const TemplateSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  group: {
    type: String,
    required: true,
  },
  era: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  serial: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("Templates", TemplateSchema);
