const { expect } = require("chai");
const sandbox = require("sinon").createSandbox();
const mongoose = require("mongoose");
const timerInteractor = require("../../use_cases/timer_interactor");
const timerController = require("../../controllers/timer_controller");
const User = require("../../entities/User");

describe("timer interactor", function () {
  beforeEach(function () {
    sandbox
      .stub(timerController, "validateDrop")
      .resolves({ userId: "validUserIdentifier" });

    sandbox
      .stub(timerController, "validateClaim")
      .resolves({ userId: "validUserIdentifier" });

    sandbox
      .stub(timerController, "updateLastDropped")
      .resolves({ userId: "validUserIdentifier" });

    sandbox
      .stub(timerController, "updateLastClaimed")
      .resolves({ userId: "validUserIdentifier" });
  });

  afterEach(function () {
    sandbox.restore();
  });

  it("return result of drop validation", async function () {
    const result = await timerInteractor.executeValidateDrop(
      timerController,
      "validUserIdentifier"
    );
    expect(result).to.have.property("userId");
  });

  it("return result of claim validation", async function () {
    const result = await timerInteractor.executeValidateClaim(
      timerController,
      "validUserIdentifier"
    );
    expect(result).to.have.property("userId");
  });

  it("return result of last drop time update", async function () {
    const result = await timerInteractor.executeUpdateLastDropped(
      timerController,
      "validUserIdentifier"
    );
    expect(result).to.have.property("userId");
  });

  it("return result of last claim time update", async function () {
    const result = await timerInteractor.executeUpdateLastClaimed(
      timerController,
      "validUserIdentifier"
    );
    expect(result).to.have.property("userId");
  });
});
