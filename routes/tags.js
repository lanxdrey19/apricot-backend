const express = require("express");
const router = express.Router();
const Server = require("../entities/Server");
const User = require("../entities/User");
const Template = require("../entities/Template");

router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findOne({
      userId: req.params.userId,
    });

    res.status(200).json(user.tags);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/add", async (req, res) => {
  try {
    const user = await User.findOne({
      userId: req.body.userId,
    });
    let isValid = true;
    user.tags.forEach((tagInfo) => {
      if (tagInfo.tagName.toLowerCase() === req.body.tagName.toLowerCase()) {
        isValid = false;
      }
    });
    if (isValid) {
      let tag = {
        tagName: req.body.tagName.toString().toLowerCase(),
        tagEmote: req.body.tagEmote.toString().toLowerCase(),
      };
      const updatedUser = await User.updateOne(
        { userId: req.body.userId },
        { $push: { tags: tag } }
      );
      res.json(updatedUser);
    } else {
      res.status(400).json({ message: "error" });
    }
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/delete", async (req, res) => {
  try {
    const user = await User.findOne({
      userId: req.body.userId,
    });
    let isValid = false;
    let finalTagName;
    let finalTagEmote;

    user.tags.forEach((tagInfo) => {
      if (tagInfo.tagName.toLowerCase() === req.body.tagName.toLowerCase()) {
        isValid = true;
        finalTagName = tagInfo.tagName.toLowerCase();
        finalTagEmote = tagInfo.tagEmote.toLowerCase();
      }
    });
    if (isValid) {
      let tag = {
        tagName: finalTagName,
        tagEmote: finalTagEmote,
      };
      const updatedUser = await User.updateOne(
        { userId: req.body.userId },
        { $pull: { tags: tag } }
      );
      res.status(204).json(updatedUser);
    } else {
      res.status(400).json({ message: "error" });
    }
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/update", async (req, res) => {
  try {
    const user = await User.findOne({
      userId: req.body.userId,
    });
    let isValid = false;
    let finalTagName;
    let finalTagEmote;

    user.tags.forEach((tagInfo) => {
      if (tagInfo.tagName.toLowerCase() === req.body.tagName.toLowerCase()) {
        isValid = true;
        finalTagName = tagInfo.tagName.toLowerCase();
        finalTagEmote = req.body.tagEmote.toLowerCase();
      }
    });
    if (isValid) {
      const updatedUser = await User.updateOne(
        { userId: req.body.userId, "tags.tagName": finalTagName },
        {
          $set: {
            "tags.$.tagEmote": finalTagEmote,
          },
        }
      );
      res.status(204).json(updatedUser);
    } else {
      res.status(400).json({ message: "error" });
    }
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
