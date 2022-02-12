const express = require("express");
const router = express.Router();
const Server = require("../entities/Server");
const User = require("../entities/User");
const Template = require("../entities/Template");

router.patch("/subtract", async (req, res) => {
  try {
    const user = await User.findOne({
      userId: req.body.userId,
    });

    let isValid = true;

    if (Number(user.tokens) - Number(req.body.number) < 0) {
      isValid = false;
    }

    if (isValid) {
      const updatedUser = await User.updateOne(
        { userId: req.body.userId },
        { $inc: { tokens: Number(req.body.number) * -1 } }
      );
      res.status(200).json(updatedUser);
    } else {
      res.status(400).json({ message: "error" });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
