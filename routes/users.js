const express = require("express");
const router = express.Router();
const User = require("../entities/User");
const Server = require("../entities/Server");
const Template = require("../entities/Template");

router.post("/", async (req, res) => {
  const user = new User({
    userId: req.body.userId,
    cards: [],
    tags: [],
    nextClaimTime: null,
    nextDropTime: null,
    tokens: 0,
  });

  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
