const { expect } = require("chai");
const sandbox = require("sinon").createSandbox();
const mongoose = require("mongoose");
const userDAO = require("../../daos/user_dao");
const userController = require("../../controllers/user_controller");
const User = require("../../entities/User");

describe("user controller", function () {
  beforeEach(function () {
    sandbox
      .stub(userDAO, "postUser")
      .resolves({ userId: "validUserIdentifier" });

    sandbox
      .stub(userDAO, "findUser")
      .resolves({ userId: "validUserIdentifier" });
  });

  afterEach(function () {
    sandbox.restore();
  });

  it("return created user", async function () {
    const result = await userController.createUser("validUserIdentifier");
    expect(result).to.have.property("userId");
  });

  it("return certain user", async function () {
    const result = await userController.getUser("validUserIdentifier");
    expect(result).to.have.property("userId");
  });
});
