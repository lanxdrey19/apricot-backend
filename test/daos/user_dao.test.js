const { expect } = require("chai");
const sandbox = require("sinon").createSandbox();
const mongoose = require("mongoose");
const userDAO = require("../../daos/user_dao");
const User = require("../../entities/User");

describe("user_dao", function () {
  beforeEach(function () {
    sandbox
      .stub(mongoose.Model.prototype, "save")
      .resolves({ userId: "validUserIdentifier" });

    sandbox.stub(User, "findOne").resolves({ userId: "validUserIdentifier" });
  });

  afterEach(function () {
    sandbox.restore();
  });

  it("return created user", async function () {
    const result = await userDAO.postUser("validUserIdentifier");
    expect(result).to.have.property("userId");
  });

  it("return user which matches the user identifier", async function () {
    const result = await userDAO.findUser("validUserIdentifier");
    expect(result).to.have.property("userId");
  });
});
