const { expect } = require("chai");
const sandbox = require("sinon").createSandbox();
const mongoose = require("mongoose");
const dropDAO = require("../../daos/drop_dao");
const Template = require("../../entities/Template");

describe("user_dao", function () {
  beforeEach(function () {
    sandbox
      .stub(Template, "find")
      .resolves([
        { template: "template1" },
        { template: "template2" },
        { template: "template3" },
      ]);
  });

  afterEach(function () {
    sandbox.restore();
  });

  it("get three templates", async function () {
    const result = await dropDAO.getTemplates();
    expect(result.toString()).to.deep.equal(
      [
        { template: "template1" },
        { template: "template2" },
        { template: "template3" },
      ].toString()
    );
  });
});
