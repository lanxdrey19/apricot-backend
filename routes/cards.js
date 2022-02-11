const express = require("express");
const router = express.Router();
const Server = require("../entities/Server");
const User = require("../entities/User");
const Template = require("../entities/Template");

router.get("/name/:userId/:name", async (req, res) => {
  try {
    const user = await User.findOne({
      userId: req.params.userId,
    });

    let validCards = [];

    const cardsLength = user.cards.length;
    let count = 0;

    user.cards.forEach(async (card) => {
      const template = await Template.findById(card.templateId);
      if (template.name.toLowerCase().includes(req.params.name.toLowerCase())) {
        validCards.push(card);
      }
      count++;
      if (count === cardsLength) {
        res.json(validCards);
      }
    });
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/group/:userId/:group", async (req, res) => {
  try {
    const user = await User.findOne({
      userId: req.params.userId,
    });

    let validCards = [];

    const cardsLength = user.cards.length;
    let count = 0;

    user.cards.forEach(async (card) => {
      const template = await Template.findById(card.templateId);
      if (
        template.group.toLowerCase().includes(req.params.group.toLowerCase())
      ) {
        validCards.push(card);
      }
      count++;
      if (count === cardsLength) {
        res.json(validCards);
      }
    });
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/tag/:userId/:tagName?", async (req, res) => {
  try {
    if (req.params.tagName === undefined) {
      res.status(400).json({ message: err });
    }
    const user = await User.findOne({
      userId: req.params.userId,
    });
    const result = user.cards.filter(
      (card) => card.tagName === req.params.tagName.toLowerCase()
    );
    res.json(result);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/serial/:userId/:upperBound?/:lowerBound?", async (req, res) => {
  try {
    const user = await User.findOne({
      userId: req.params.userId,
    });

    const result = user.cards.filter(
      (card) =>
        Number(card.recordedSerial) >= Number(req.params.lowerBound) &&
        Number(card.recordedSerial) <= Number(req.params.upperBound)
    );
    res.json(result);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/stars/:userId/:upperBound?/:lowerBound?", async (req, res) => {
  try {
    const user = await User.findOne({
      userId: req.params.userId,
    });

    const result = user.cards.filter(
      (card) =>
        Number(card.stars) >= Number(req.params.lowerBound) &&
        Number(card.stars) <= Number(req.params.upperBound)
    );
    res.json(result);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/add/:templateId", async (req, res) => {
  try {
    const template = await Template.findById(req.params.templateId);
    let card = {
      templateId: template._id,
      recordedSerial: template.serial,
      stars: Number(req.body.stars),
      tagName: "",
    };
    const updatedUser = await User.updateOne(
      { userId: req.body.userId },
      { $push: { cards: card } }
    );
    res.json(updatedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/delete/:templateId", async (req, res) => {
  try {
    const template = await Template.findById(req.params.templateId);
    let card = {
      templateId: template._id,
      recordedSerial: req.body.recordedSerial,
      stars: Number(req.body.stars),
      tagName: req.body.tagName,
    };
    const updatedUser = await User.updateOne(
      { userId: req.body.userId },
      { $pull: { cards: card } }
    );
    res.json(updatedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
