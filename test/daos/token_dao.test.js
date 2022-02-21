const { expect } = require("chai");
const sandbox = require("sinon").createSandbox();
const mongoose = require("mongoose");
const tokenDAO = require("../../daos/token_dao");
const User = require("../../entities/User");

describe("token_dao valid calls", function () {
  beforeEach(function () {
    sandbox
      .stub(User, "findOne")
      .resolves({ userId: "validUserIdentifier", tokens: 1000 });
    sandbox.stub(User, "updateOne").resolves({ newTokenAmount: "tokenNumber" });
  });

  afterEach(function () {
    sandbox.restore();
  });

  it("subtract tokens with sufficient funds", async function () {
    const validRequestBody = { userId: "validUserIdentifier", number: 500 };
    const result = await tokenDAO.putTokens(validRequestBody);
    expect(result).to.have.property("newTokenAmount");
  });
});

describe("token_dao invalid calls", function () {
  beforeEach(function () {
    sandbox
      .stub(User, "findOne")
      .resolves({ userId: "validUserIdentifier", tokens: 0 });
    sandbox.stub(User, "updateOne").resolves({ newTokenAmount: "tokenNumber" });
  });

  afterEach(function () {
    sandbox.restore();
  });

  it("subtract tokens with sufficient funds", async function () {
    try {
      const invalidRequestBody = { userId: "validUserIdentifier", number: 500 };
      tokenDAO.putTokens(invalidRequestBody);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.eql("server error occurred");
    }
  });
});
