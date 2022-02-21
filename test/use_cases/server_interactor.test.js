const { expect } = require("chai");
const sandbox = require("sinon").createSandbox();
const mongoose = require("mongoose");
const serverInteractor = require("../../use_cases/server_interactor");
const serverController = require("../../controllers/server_controller");
const User = require("../../entities/User");
const server = { serverId: "serverId" };

describe("server interactor", function () {
  beforeEach(function () {
    sandbox.stub(serverController, "getServer").resolves(server);

    sandbox.stub(serverController, "createServer").resolves(server);

    sandbox.stub(serverController, "updateDropChannel").resolves(server);
  });

  afterEach(function () {
    sandbox.restore();
  });

  it("return server with matching id", async function () {
    const result = await serverInteractor.executeGetServer(
      serverController,
      "validUserIdentifier"
    );
    expect(result).to.have.property("serverId");
  });

  it("returns created server", async function () {
    const result = await serverInteractor.executeCreateServer(
      serverController,
      server
    );
    expect(result).to.have.property("serverId");
  });

  it("returns updated server", async function () {
    const result = await serverInteractor.executeUpdateDropChannel(
      serverController,
      server
    );
    expect(result).to.have.property("serverId");
  });
});
