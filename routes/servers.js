const express = require("express");
const router = express.Router();
const Server = require("../entities/Server");

router.get("/:serverId", async (req, res) => {
  try {
    const server = await Server.find({
      serverId: req.params.serverId,
    });
    res.json(server);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  const server = new Server({
    serverId: req.body.serverId,
  });

  try {
    const savedServer = await server.save();
    res.json(savedServer);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:serverId", async (req, res) => {
  try {
    const updatedServer = await Server.updateOne(
      { serverId: req.params.serverId },
      { $set: { dropChannel: req.body.dropChannel } }
    );
    res.json(updatedServer);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
