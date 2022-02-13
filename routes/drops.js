const express = require("express");
const router = express.Router();
const Server = require("../entities/Server");
const User = require("../entities/User");
const Template = require("../entities/Template");

router.get("/", async (req, res) => {
  try {
    const templates = await Template.find();
    let finalList = [];
    while (finalList.length < 3) {
      const template = templates[Math.floor(Math.random() * templates.length)];

      if (!finalList.includes(template)) {
        finalList.push(template);
      }
    }

    res.status(200).json(finalList);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
