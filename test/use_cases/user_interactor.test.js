const { expect } = require("chai");
const sandbox = require("sinon").createSandbox();
const mongoose = require("mongoose");
const userInteractor = require("../../use_cases/user_interactor");
const userController = require("../../controllers/user_controller");
const User = require("../../entities/User");

describe("user interactor", function () {
  beforeEach(function () {
    sandbox
      .stub(userController, "createUser")
      .resolves({ userId: "validUserIdentifier" });

    sandbox
      .stub(userController, "getUser")
      .resolves({ userId: "validUserIdentifier" });
  });

  afterEach(function () {
    sandbox.restore();
  });

  it("return created user", async function () {
    const result = await userInteractor.executeCreateUser(
      userController,
      "validUserIdentifier"
    );
    expect(result).to.have.property("userId");
  });

  it("return user with id", async function () {
    const result = await userInteractor.executeGetUser(
      userController,
      "validUserIdentifier"
    );
    expect(result).to.have.property("userId");
  });
});
