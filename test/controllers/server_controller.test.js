const { expect } = require("chai");
const sandbox = require("sinon").createSandbox();
const mongoose = require("mongoose");
const serverDAO = require("../../daos/server_dao");
const serverController = require("../../controllers/server_controller");
const Server = require("../../entities/Server");
const serverObject = { serverId: "serverId", dropChannel: "dropChannel" };

describe("user controller", function () {
  beforeEach(function () {
    sandbox.stub(serverDAO, "findServer").resolves(serverObject);

    sandbox.stub(serverDAO, "postServer").resolves(serverObject);

    sandbox.stub(serverDAO, "putServerDropChannel").resolves(serverObject);
  });

  afterEach(function () {
    sandbox.restore();
  });

  it("returns server found", async function () {
    const result = await serverController.getServer("validServerIdentifier");
    expect(result).to.have.property("serverId");
  });

  it("returns created server", async function () {
    const result = await serverController.createServer(serverObject);
    expect(result).to.have.property("serverId");
  });

  it("returns updated server information", async function () {
    const result = await serverController.updateDropChannel(
      "validServerIdentifier",
      serverObject
    );
    expect(result).to.have.property("dropChannel");
  });
});
