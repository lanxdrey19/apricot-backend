const express = require("express");
const router = express.Router();
const Server = require("../entities/Server");
const User = require("../entities/User");
const Template = require("../entities/Template");
const tagInteractor = require("../use_cases/tag_interactor");
const tagController = require("../controllers/tag_controller");

router.get("/:userId", async (req, res) => {
  try {
    const tags = await tagInteractor.executeGetUserTags(
      cardController,
      req.params.userId
    );
    res.status(200).json(tags);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.patch("/add", async (req, res) => {
  try {
    const result = await tagInteractor.executeAddTag(cardController, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/delete", async (req, res) => {
  try {
    const result = await tagInteractor.executeDeleteTag(
      cardController,
      req.body
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.patch("/update", async (req, res) => {
  try {
    const result = await tagInteractor.executeUpdateUserTag(
      cardController,
      req.body
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.patch("/tagcard", async (req, res) => {
  try {
    const result = await tagInteractor.executeTagUserCard(
      cardController,
      req.body
    );
    res.status(200).json(result);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
