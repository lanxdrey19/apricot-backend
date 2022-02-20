const { expect } = require("chai");
const sandbox = require("sinon").createSandbox();
const mongoose = require("mongoose");
const templateDAO = require("../../daos/template_dao");
const templateController = require("../../controllers/template_controller");
const Template = require("../../entities/Template");

describe("template controller", function () {
  beforeEach(function () {
    sandbox.stub(templateDAO, "postTemplate").resolves({ name: "name" });
    sandbox.stub(templateDAO, "putSerial").resolves({ name: "name" });
  });

  afterEach(function () {
    sandbox.restore();
  });

  it("return created template", async function () {
    const template = {
      name: "name",
      group: "group",
      era: "era",
      logo: "logo",
      photo: "photo",
    };
    const result = await templateController.createTemplate(template);
    expect(result).to.have.property("name");
  });

  it("return result of updating serial of template", async function () {
    const template = {
      name: "name",
      group: "group",
      era: "era",
      logo: "logo",
      photo: "photo",
    };
    const result = await templateController.updateSerial(template);
    expect(result).to.have.property("name");
  });
});
