const { expect } = require("chai");
const sandbox = require("sinon").createSandbox();
const mongoose = require("mongoose");
const tagInteractor = require("../../use_cases/tag_interactor");
const tagController = require("../../controllers/tag_controller");
const User = require("../../entities/User");
const tags = { tags: [] };
const tagInfo = { tagName: "tagName", tagEmote: "tagEmote" };
const card = { name: "name" };

describe("tag controller", function () {
  beforeEach(function () {
    sandbox.stub(tagController, "getTags").resolves(tags);

    sandbox.stub(tagController, "addTag").resolves(tagInfo);

    sandbox.stub(tagController, "deleteTag").resolves(tagInfo);

    sandbox.stub(tagController, "updateUserTag").resolves(tagInfo);

    sandbox.stub(tagController, "tagUserCard").resolves(card);
  });

  afterEach(function () {
    sandbox.restore();
  });

  it("return user's tags", async function () {
    const result = await tagInteractor.executeGetUserTags(
      tagController,
      "validUserIdentifier"
    );
    expect(result).to.have.property("tags");
  });

  it("return added tag", async function () {
    const result = await tagInteractor.executeAddTag(tagController, tagInfo);
    expect(result).to.have.property("tagName");
  });

  it("return deleted tag", async function () {
    const result = await tagInteractor.executeDeleteTag(tagController, tagInfo);
    expect(result).to.have.property("tagName");
  });

  it("return updated tag", async function () {
    const result = await tagInteractor.executeUpdateUserTag(
      tagController,
      tagInfo
    );
    expect(result).to.have.property("tagName");
  });

  it("return updated card", async function () {
    const result = await tagInteractor.executeTagUserCard(tagController, card);
    expect(result).to.have.property("name");
  });
});
