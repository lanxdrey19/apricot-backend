const express = require("express");
const router = express.Router();
const Template = require("../entities/Template");
const templateInteractor = require("../use_cases/template_interactor");
const templateController = require("../controllers/template_controller");

router.post("/", async (req, res) => {
  try {
    const template = await templateInteractor.executeCreateTemplate(
      templateController,
      req.body
    );
    res.status(200).json(template);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.patch("/increment", async (req, res) => {
  try {
    const template = await templateInteractor.executeIncrementSerial(
      templateController,
      req.body
    );
    res.status(200).json(template);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
