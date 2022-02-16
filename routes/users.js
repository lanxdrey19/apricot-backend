const express = require("express");
const router = express.Router();
const User = require("../entities/User");
const Server = require("../entities/Server");
const Template = require("../entities/Template");
const userInteractor = require("../use_cases/user_interactor");
const userController = require("../controllers/user_controller");

router.post("/", async (req, res) => {
  try {
    const result = await userInteractor.executeCreateUser(
      userController,
      req.body.userId
    );

    res.status(200).json(result);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const result = await userInteractor.executeGetUser(
      userController,
      req.params.userId
    );

    res.status(200).json(result);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
