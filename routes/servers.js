const express = require("express");
const router = express.Router();
const Server = require("../entities/Server");
const serverInteractor = require("../use_cases/server_interactor");
const serverController = require("../controllers/server_controller");

router.get("/:serverId", async (req, res) => {
  try {
    const server = await serverInteractor.executeGetServer(
      serverController,
      req.params.serverId
    );
    console.log(server);

    res.status(200).json(server);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.post("/", async (req, res) => {
  try {
    const server = await serverInteractor.executeCreateServer(
      serverController,
      req.body
    );
    res.json(server);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.patch("/:serverId", async (req, res) => {
  try {
    const server = await serverInteractor.executeUpdateDropChannel(
      serverController,
      req.params.serverId,
      req.body
    );
    res.json(server);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
