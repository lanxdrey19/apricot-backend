const { expect } = require("chai");
const sandbox = require("sinon").createSandbox();
const mongoose = require("mongoose");
const serverDAO = require("../../daos/server_dao");
const Server = require("../../entities/Server");

describe("user_dao", function () {
  beforeEach(function () {
    sandbox
      .stub(mongoose.Model.prototype, "save")
      .resolves({ serverId: "validServerIdentifier" });

    sandbox
      .stub(Server, "find")
      .resolves({ serverId: "validServerIdentifier" });

    sandbox
      .stub(Server, "updateOne")
      .resolves({ serverId: "validServerIdentifier" });
  });

  afterEach(function () {
    sandbox.restore();
  });

  it("find server based on server Identifier", async function () {
    const result = await serverDAO.findServer("validServerIdentifier");
    expect(result).to.have.property("serverId");
  });

  it("creates a new server record", async function () {
    const server = new Server({
      serverId: "serverId",
    });
    const result = await serverDAO.postServer(server);
    expect(result).to.have.property("serverId");
  });

  it("updates drop channel of Server", async function () {
    const result = await serverDAO.putServerDropChannel(
      "serverId",
      "newDropChanel"
    );
    expect(result).to.have.property("serverId");
  });
});
