const { expect } = require("chai");
const sandbox = require("sinon").createSandbox();
const mongoose = require("mongoose");
const templateInteractor = require("../../use_cases/template_interactor");
const templateController = require("../../controllers/template_controller");
const Template = require("../../entities/Template");
const templateObject = { name: "name" };

describe("template interactor", function () {
  beforeEach(function () {
    sandbox.stub(templateController, "createTemplate").resolves(templateObject);

    sandbox.stub(templateController, "updateSerial").resolves(templateObject);
  });

  afterEach(function () {
    sandbox.restore();
  });

  it("return created template", async function () {
    const result = await templateInteractor.executeCreateTemplate(
      templateController,
      templateObject
    );
    expect(result).to.have.property("name");
  });

  it("return template with serial incremented", async function () {
    const result = await templateInteractor.executeIncrementSerial(
      templateController,
      templateObject
    );
    expect(result).to.have.property("name");
  });
});
