const { expect } = require("chai");
const sandbox = require("sinon").createSandbox();
const mongoose = require("mongoose");
const dropDAO = require("../../daos/drop_dao");
const dropController = require("../../controllers/drop_controller");

describe("drop controller", function () {
  beforeEach(function () {
    sandbox.stub(dropDAO, "getTemplates").resolves({ templates: [] });
  });

  afterEach(function () {
    sandbox.restore();
  });

  it("return templates", async function () {
    const result = await dropController.dropCards();
    expect(result).to.have.property("templates");
  });
});
