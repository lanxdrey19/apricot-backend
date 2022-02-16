const express = require("express");
const router = express.Router();
const Server = require("../entities/Server");
const User = require("../entities/User");
const Template = require("../entities/Template");
const cardInteractor = require("../use_cases/card_interactor");
const cardController = require("../controllers/card_controller");

router.get("/all/:userId", async (req, res) => {
  try {
    const cards = await cardInteractor.executeGetUserCards(
      cardController,
      req.params.userId
    );
    res.status(200).json(cards);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get("/name/:userId/:name", async (req, res) => {
  try {
    const cards = await cardInteractor.executeGetCardsByName(
      cardController,
      req.params.userId,
      req.params.name
    );

    res.status(200).json(cards);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get("/group/:userId/:group", async (req, res) => {
  try {
    const cards = await cardInteractor.executeGetCardsByGroup(
      cardController,
      req.params.userId,
      req.params.group
    );

    res.status(200).json(cards);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get("/tag/:userId/:tagName?", async (req, res) => {
  try {
    const cards = await cardInteractor.executeGetCardsByTag(
      cardController,
      req.params.userId,
      req.params.tagName
    );

    res.status(200).json(cards);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get("/serial/:userId/:upperBound?/:lowerBound?", async (req, res) => {
  try {
    const cards = await cardInteractor.executeGetCardsBySerial(
      cardController,
      req.params.userId,
      req.params.upperBound,
      req.params.lowerBound
    );
    res.status(200).json(cards);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get("/stars/:userId/:upperBound?/:lowerBound?", async (req, res) => {
  try {
    const cards = await cardInteractor.executeGetCardsByStars(
      cardController,
      req.params.userId,
      req.params.upperBound,
      req.params.lowerBound
    );
    res.status(200).json(cards);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.patch("/add/:templateId", async (req, res) => {
  try {
    const cards = await cardInteractor.executeAddCardToUser(
      cardController,
      req.params.templateId,
      req.body
    );
    res.status(200).json(cards);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.patch("/claim/:templateId", async (req, res) => {
  try {
    const cards = await cardInteractor.executeClaimCard(
      cardController,
      req.params.templateId,
      req.body
    );
    res.status(200).json(cards);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.patch("/delete/:templateId", async (req, res) => {
  try {
    const cards = await cardInteractor.executeDeleteCardFromUser(
      cardController,
      req.params.templateId,
      req.body
    );
    res.status(200).json(cards);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.patch("/burn/:templateId", async (req, res) => {
  try {
    const result = await cardInteractor.executeBurnCard(
      cardController,
      req.params.templateId,
      req.body
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.patch("/upgradeCard", async (req, res) => {
  try {
    const result = await cardInteractor.executeUpgradeCard(
      cardController,
      req.body
    );
    res.status(200).json(result);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
