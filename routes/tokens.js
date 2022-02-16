const express = require("express");
const router = express.Router();
const Server = require("../entities/Server");
const User = require("../entities/User");
const Template = require("../entities/Template");
const tokenInteractor = require("../use_cases/token_interactor");
const tokenController = require("../controllers/token_controller");

router.patch("/subtract", async (req, res) => {
  try {
    const result = await tokenInteractor.executeSubtractTokens(
      tokenController,
      requestBody
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
