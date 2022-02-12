const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  cards: {
    type: [
      {
        templateId: {
          type: String,
          required: true,
        },
        recordedSerial: {
          type: String,
          required: true,
        },
        stars: {
          type: Number,
          required: true,
        },
        tagName: {
          type: String,
          default: "",
        },
      },
    ],
    default: [],
  },
  tags: {
    type: [
      {
        tagName: {
          type: String,
          required: true,
        },
        tagEmote: {
          type: String,
          required: true,
        },
      },
    ],
    default: [],
  },
  lastClaimed: {
    type: Date,
    default: Date.now(),
  },
  lastDropped: {
    type: Date,
    default: Date.now(),
  },
  tokens: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Users", UserSchema);
