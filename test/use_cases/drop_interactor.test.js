const { expect } = require("chai");
const sandbox = require("sinon").createSandbox();
const mongoose = require("mongoose");
const dropInteractor = require("../../use_cases/drop_interactor");
const dropController = require("../../controllers/drop_controller");
const User = require("../../entities/User");
const templates = { templates: [] };

describe("drp[] interactor", function () {
  beforeEach(function () {
    sandbox.stub(dropController, "dropCards").resolves(templates);
  });

  afterEach(function () {
    sandbox.restore();
  });

  it("return list of templates", async function () {
    const result = await dropInteractor.executeDropCards(dropController);
    expect(result).to.have.property("templates");
  });
});
