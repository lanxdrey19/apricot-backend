const express = require("express");
const router = express.Router();
const Server = require("../entities/Server");
const User = require("../entities/User");
const Template = require("../entities/Template");
const { valid } = require("semver");

router.get("/name/:userId/:name", async (req, res) => {
  try {
    const user = await User.findOne({
      userId: req.params.userId,
    });

    let validCards = [];

    const cardsLength = user.cards.length;
    let count = 0;

    user.cards.forEach(async (card) => {
      const template = await Template.findById(card[0]);
      if (template.name.toLowerCase().includes(req.params.name.toLowerCase())) {
        validCards.push(card);
        console.log(validCards);
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

router.get("/tag/:userId/:tag?", async (req, res) => {
  try {
    if (req.params.tag === undefined) {
      res.status(400);
    }
    const user = await User.findOne({
      userId: req.params.userId,
    });

    const result = user.cards.filter((card) => card[3] === req.params.tag);
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
        Number(card[1]) >= Number(req.params.lowerBound) &&
        Number(card[1]) <= Number(req.params.upperBound)
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
        Number(card[2]) >= Number(req.params.lowerBound) &&
        Number(card[2]) <= Number(req.params.upperBound)
    );
    res.json(result);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/add/:templateId", async (req, res) => {
  try {
    const template = await Template.findById(req.params.templateId);
    const updatedUser = await User.updateOne(
      { userId: req.body.userId },
      { $push: { cards: [template._id, template.serial, req.body.stars, ""] } }
    );
    res.json(updatedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/delete/:templateId", async (req, res) => {
  try {
    const template = await Template.findById(req.params.templateId);
    const updatedUser = await User.updateOne(
      { userId: req.body.userId },
      { $pull: { cards: [template._id, template.serial, req.body.stars, ""] } }
    );
    res.json(updatedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
