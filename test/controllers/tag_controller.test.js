const { expect } = require("chai");
const sandbox = require("sinon").createSandbox();
const mongoose = require("mongoose");
const tagDAO = require("../../daos/tag_dao");
const tagController = require("../../controllers/tag_controller");
const requestBody = { tags: [] };

describe("user controller", function () {
  beforeEach(function () {
    sandbox.stub(tagDAO, "findTags").resolves(requestBody);

    sandbox.stub(tagDAO, "addTagForUser").resolves(requestBody);

    sandbox.stub(tagDAO, "deleteTagForUser").resolves(requestBody);

    sandbox.stub(tagDAO, "updateTagForUser").resolves({ tagName: "tagName" });

    sandbox.stub(tagDAO, "updateTagUserCard").resolves({ update: "update" });
  });

  afterEach(function () {
    sandbox.restore();
  });

  it("returns user tags", async function () {
    const result = await tagController.getTags("validUserIdentifier");
    expect(result).to.have.property("tags");
  });

  it("returns result when user creates a tag", async function () {
    const result = await tagController.addTag(requestBody);
    expect(result).to.have.property("tags");
  });

  it("returns result when user deletes a tag", async function () {
    const result = await tagController.deleteTag(requestBody);
    expect(result).to.have.property("tags");
  });

  it("returns result when user updates information of a tag", async function () {
    const result = await tagController.updateUserTag(requestBody);
    expect(result).to.have.property("tagName");
  });

  it("returns result when user updates the tag of a card", async function () {
    const result = await tagController.tagUserCard(requestBody);
    expect(result).to.have.property("update");
  });
});
