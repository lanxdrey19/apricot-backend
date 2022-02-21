const { expect, assert } = require("chai");
const sandbox = require("sinon").createSandbox();
const mongoose = require("mongoose");
const templateDAO = require("../../daos/template_dao");
const Template = require("../../entities/Template");

describe("template_dao", function () {
  beforeEach(function () {
    sandbox
      .stub(mongoose.Model.prototype, "save")
      .resolves({ name: "templateName" });

    sandbox
      .stub(Template, "updateOne")
      .resolves({ serialNumber: "newSerialNumber" });
  });

  afterEach(function () {
    sandbox.restore();
  });

  it("create new template", async function () {
    const template = new Template({
      name: "templateName",
      group: "templateGroup",
      era: "era",
      logo: "logo",
      photo: "photo",
    });
    const result = await templateDAO.postTemplate(template);
    expect(result).to.have.property("name");
  });

  it("increments serial of template", async function () {
    const templateIdentifiers = { identifiers: "templateIdentifiers" };
    const result = await templateDAO.putSerial(templateIdentifiers);
    expect(result).to.have.property("serialNumber");
  });
});
