const express = require("express");
const router = express.Router();
const Server = require("../entities/Server");
const User = require("../entities/User");
const Template = require("../entities/Template");
const dropInteractor = require("../use_cases/drop_interactor");
const dropController = require("../controllers/drop_controller");

router.get("/", async (req, res) => {
  try {
    const result = await serverInteractor.executeDropCards(dropController);

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
