const express = require("express");
const router = express.Router();
const Template = require("../entities/Template");

router.post("/", async (req, res) => {
  const template = new Template({
    name: req.body.name,
    group: req.body.group,
    era: req.body.era,
    photo: req.body.photo,
  });

  try {
    const savedTemplate = await template.save();
    res.json(savedTemplate);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/increment", async (req, res) => {
  try {
    const updatedTemplate = await Template.updateOne(
      {
        name: req.body.name,
        group: req.body.group,
        era: req.body.era,
      },
      { $inc: { serial: 1 } }
    );
    res.json(updatedTemplate);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
