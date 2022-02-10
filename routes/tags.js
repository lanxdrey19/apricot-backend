const express = require("express");
const router = express.Router();
const Server = require("../entities/Server");
const User = require("../entities/User");
const Template = require("../entities/Template");

router.patch("/add", async (req, res) => {
  try {
    const user = await User.findOne({
      userId: req.body.userId,
    });
    let isValid = true;

    user.tags.forEach((tagInfo) => {
      if (tagInfo[0].toLowerCase() === req.body.tagName.toLowerCase()) {
        isValid = false;
      }
    });
    if (isValid) {
      await User.updateOne(
        { userId: req.body.userId },
        {
          $push: {
            tags: [
              req.body.tagName.toString().toLowerCase(),
              req.body.tagEmote.toString().toLowerCase(),
            ],
          },
        }
      );
      res.status(204).json({ message: "success" });
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
      if (tagInfo[0].toLowerCase() === req.body.tagName.toLowerCase()) {
        isValid = true;
        finalTagName = tagInfo[0].toLowerCase();
        finalTagEmote = tagInfo[1].toLowerCase();
      }
    });
    if (isValid) {
      await User.updateOne(
        { userId: req.body.userId },
        {
          $pull: {
            tags: [finalTagName, finalTagEmote],
          },
        }
      );
      res.status(204).json({ message: "success" });
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
    let finalTagInfo = user.tags;
    for (let i = 0; i < user.tags.length; i++) {
      if (user.tags[i][0].toLowerCase() === req.body.tagName.toLowerCase()) {
        isValid = true;
        finalTagInfo[i] = [
          req.body.tagName.toLowerCase(),
          req.body.tagEmote.toLowerCase(),
        ];
      }
    }
    if (isValid) {
      await User.updateOne(
        { userId: req.body.userId },
        { $set: { tags: finalTagInfo } }
      );
      res.status(204).json({ message: "success" });
    } else {
      res.status(400).json({ message: "error" });
    }
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
