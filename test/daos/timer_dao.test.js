const { expect, assert } = require("chai");
const sandbox = require("sinon").createSandbox();
const mongoose = require("mongoose");
const timerDAO = require("../../daos/timer_dao");
const User = require("../../entities/User");

describe("timer_dao valid check", function () {
  beforeEach(function () {
    sandbox.stub(User, "findOne").resolves({
      userId: "validUserIdentifier",
      lastDropped: 0,
      lastClaimed: 0,
    });
  });

  afterEach(function () {
    sandbox.restore();
  });

  it("time from last drop is sufficuent", async function () {
    const validRequestBody = { validField: "fieldItem" };
    const result = await timerDAO.getDrop(validRequestBody);
    expect(result).to.have.property("message");
  });

  it("time from last claim is sufficuent", async function () {
    const validRequestBody = { validField: "fieldItem" };
    const result = await timerDAO.getClaim(validRequestBody);
    expect(result).to.have.property("message");
  });
});

describe("timer_dao invalid check", function () {
  beforeEach(function () {
    sandbox.stub(User, "findOne").resolves({
      userId: "validUserIdentifier",
      lastDropped: new Date(),
      lastClaimed: new Date(),
    });
  });

  afterEach(function () {
    sandbox.restore();
  });

  it("time from last drop is insufficient", async function () {
    try {
      const validRequestBody = { validField: "fieldItem" };
      await timerDAO.getDrop(validRequestBody);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.eql("server error occurred");
    }
  });

  it("time from last claim is insufficient", async function () {
    try {
      const validRequestBody = { validField: "fieldItem" };
      await timerDAO.getClaim(validRequestBody);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.eql("server error occurred");
    }
  });
});

describe("timer_dao valid time update", function () {
  beforeEach(function () {
    sandbox
      .stub(User, "updateOne")
      .resolves({ newClaimTime: "claimTime", newDropTime: "dropTime" });
  });

  afterEach(function () {
    sandbox.restore();
  });

  it("update last drop time", async function () {
    const validUserIdentifier = "userIdentifier";
    const result = await timerDAO.putLastDropped(validUserIdentifier);
    expect(result).to.have.property("newDropTime");
  });

  it("update last claim time", async function () {
    const validUserIdentifier = "userIdentifier";
    const result = await timerDAO.putLastClaimed(validUserIdentifier);
    expect(result).to.have.property("newClaimTime");
  });
});
