const express = require("express");
const router = express.Router();
const Server = require("../entities/Server");
const User = require("../entities/User");
const Template = require("../entities/Template");

router.get("/all/:userId", async (req, res) => {
  try {
    const user = await User.findOne({
      userId: req.params.userId,
    });

    res.json(user.cards);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

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
    res.status(400).json({ message: err });
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
    res.status(400).json({ message: err });
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
    res.status(400).json({ message: err });
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
    res.status(400).json({ message: err });
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
    res.status(400).json({ message: err });
  }
});

router.patch("/add/:templateId", async (req, res) => {
  try {
    const template = await Template.findById(req.params.templateId);
    let card = {
      templateId: template._id,
      recordedSerial: req.body.recordedSerial,
      stars: Number(req.body.stars),
      tagName: "",
    };
    const updatedUser = await User.updateOne(
      { userId: req.body.userId },
      { $push: { cards: card } }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.patch("/claim/:templateId", async (req, res) => {
  try {
    let finalStars;
    let starNumber = Math.floor(Math.random() * 100) + 1;
    if (starNumber > 99) {
      finalStars = 5;
    } else if (starNumber > 90) {
      finalStars = 4;
    } else if (starNumber > 75) {
      finalStars = 3;
    } else if (starNumber > 55) {
      finalStars = 2;
    } else if (starNumber > 30) {
      finalStars = 1;
    } else {
      finalStars = 0;
    }

    const template = await Template.findById(req.params.templateId);
    let card = {
      templateId: template._id,
      recordedSerial: template.serial,
      stars: finalStars,
      tagName: "",
    };
    const updatedUser = await User.updateOne(
      { userId: req.body.userId },
      { $push: { cards: card } }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err });
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

    await User.updateOne(
      { userId: req.body.userId },
      { $pull: { cards: card } }
    );
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.patch("/burn/:templateId", async (req, res) => {
  try {
    const template = await Template.findById(req.params.templateId);

    let card = {
      templateId: template._id,
      recordedSerial: req.body.recordedSerial,
      stars: Number(req.body.stars),
      tagName: req.body.tagName,
    };

    let finalTokens;

    if (Number(req.body.stars) === 5) {
      finalTokens = Math.floor(Math.random() * 1) + 100;
    } else if (Number(req.body.stars) === 4) {
      finalTokens = Math.floor(Math.random() * 9) + 91;
    } else if (Number(req.body.stars) === 3) {
      finalTokens = Math.floor(Math.random() * 15) + 76;
    } else if (Number(req.body.stars) === 2) {
      finalTokens = Math.floor(Math.random() * 20) + 56;
    } else if (Number(req.body.stars) === 1) {
      finalTokens = Math.floor(Math.random() * 25) + 31;
    } else {
      finalTokens = Math.floor(Math.random() * 30) + 1;
    }

    const user = await User.findOne({
      userId: req.body.userId,
    });
    if (Number(finalTokens) + Number(user.tokens) > 100000) {
      await User.updateOne(
        { userId: req.body.userId },
        { $set: { tokens: 100000 }, $pull: { cards: card } }
      );
      res.status(200).json({ message: "max tokens is 100,000" });
    } else {
      const updatedUser = await User.updateOne(
        { userId: req.body.userId },
        { $inc: { tokens: finalTokens }, $pull: { cards: card } }
      );
      res.status(200).json(updatedUser);
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
