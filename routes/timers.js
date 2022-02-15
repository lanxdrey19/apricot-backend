const express = require("express");
const router = express.Router();
const Server = require("../entities/Server");
const User = require("../entities/User");
const Template = require("../entities/Template");
const timerInteractor = require("../use_cases/timer_interactor");
const timerController = require("../controllers/timer_controller");

router.get("/drop/validate/:userId", async (req, res) => {
  try {
    const result = await timerInteractor.executeValidateDrop(
      timerController,
      req.params.userId
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get("/claim/validate/:userId", async (req, res) => {
  try {
    const result = await timerInteractor.executeValidateClaim(
      timerController,
      req.params.userId
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.patch("/drop/set", async (req, res) => {
  try {
    const result = await timerInteractor.executeUpdateLastDropped(
      timerController,
      req.body.userId
    );

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.patch("/claim/set", async (req, res) => {
  try {
    const result = await timerInteractor.executeUpdateLastClaimed(
      timerController,
      req.body.userId
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
