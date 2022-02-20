const { expect } = require("chai");
const sandbox = require("sinon").createSandbox();
const mongoose = require("mongoose");
const tokenDAO = require("../../daos/token_dao");
const tokenController = require("../../controllers/token_controller");
const User = require("../../entities/User");

describe("user controller", function () {
  beforeEach(function () {
    sandbox
      .stub(tokenDAO, "putTokens")
      .resolves({ userId: "validUserIdentifier" });
  });

  afterEach(function () {
    sandbox.restore();
  });

  it("subtract token from user", async function () {
    const result = await tokenController.subtractTokens("validUserIdentifier");
    expect(result).to.have.property("userId");
  });
});
