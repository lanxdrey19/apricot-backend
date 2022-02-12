const express = require("express");
const router = express.Router();
const Server = require("../entities/Server");
const User = require("../entities/User");
const Template = require("../entities/Template");

router.get("/drop/validate", async (req, res) => {
  try {
    const user = await User.findOne({
      userId: req.body.userId,
    });

    let secondsBetweenTwoDates = Math.abs(
      (Number(Date.now()) - Number(Date.parse(user.lastDropped))) / 1000
    );

    if (secondsBetweenTwoDates > 1800) {
      res.status(200).json({ message: "valid" });
    } else {
      res.status(400).json({ message: "error" });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get("/claim/validate", async (req, res) => {
  try {
    const user = await User.findOne({
      userId: req.body.userId,
    });

    let secondsBetweenTwoDates = Math.abs(
      (Number(Date.now()) - Number(Date.parse(user.lastDropped))) / 1000
    );

    if (secondsBetweenTwoDates > 600) {
      res.status(200).json({ message: "valid" });
    } else {
      res.status(400).json({ message: "error" });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get("/drop/set", async (req, res) => {
  try {
    const updatedUser = await User.updateOne(
      { userId: req.body.userId },
      { $set: { lastDropped: Date.now() } }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get("/claim/set", async (req, res) => {
  try {
    const updatedUser = await User.updateOne(
      { userId: req.body.userId },
      { $set: { lastClaimed: Date.now() } }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
