const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  cards: {
    type: [[String]], // [reference to template db id, recorded serial, stars, tag name ("" if no tag) ]
    required: true,
  },
  tags: {
    type: [[String]],
    required: true,
  },
  nextClaimTime: {
    type: Date,
    default: null,
  },
  nextDropTime: {
    type: Date,
    default: null,
  },
  tokens: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Users", UserSchema);
