const { expect } = require("chai");
const sandbox = require("sinon").createSandbox();
const mongoose = require("mongoose");
const timerDAO = require("../../daos/timer_dao");
const timerController = require("../../controllers/timer_controller");
const User = require("../../entities/User");

describe("timer controller", function () {
  beforeEach(function () {
    sandbox
      .stub(timerDAO, "getDrop")
      .resolves({ userId: "validUserIdentifier" });

    sandbox
      .stub(timerDAO, "getClaim")
      .resolves({ userId: "validUserIdentifier" });

    sandbox
      .stub(timerDAO, "putLastDropped")
      .resolves({ userId: "validUserIdentifier" });

    sandbox
      .stub(timerDAO, "putLastClaimed")
      .resolves({ userId: "validUserIdentifier" });
  });

  afterEach(function () {
    sandbox.restore();
  });

  it("return result of drop validation", async function () {
    const result = await timerController.validateDrop("validUserIdentifier");
    expect(result).to.have.property("userId");
  });

  it("return result of claim validation", async function () {
    const result = await timerController.validateClaim("validUserIdentifier");
    expect(result).to.have.property("userId");
  });

  it("return result of last drop time update", async function () {
    const result = await timerController.updateLastDropped(
      "validUserIdentifier"
    );
    expect(result).to.have.property("userId");
  });

  it("return result of last claim time update", async function () {
    const result = await timerController.updateLastClaimed(
      "validUserIdentifier"
    );
    expect(result).to.have.property("userId");
  });
});
