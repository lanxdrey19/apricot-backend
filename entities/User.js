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
    required: true,
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
