const { expect } = require("chai");
const sandbox = require("sinon").createSandbox();
const mongoose = require("mongoose");
const tokenInteractor = require("../../use_cases/token_interactor");
const tokenController = require("../../controllers/token_controller");
const User = require("../../entities/User");
const requestBody = {};

describe("token interactor", function () {
  beforeEach(function () {
    sandbox
      .stub(tokenController, "subtractTokens")
      .resolves({ userId: "validUserIdentifier" });
  });

  afterEach(function () {
    sandbox.restore();
  });

  it("return user details with tokens subtracted", async function () {
    const result = await tokenInteractor.executeSubtractTokens(
      tokenController,
      requestBody
    );
    expect(result).to.have.property("userId");
  });
});
