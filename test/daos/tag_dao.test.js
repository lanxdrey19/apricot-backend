const { expect, assert } = require("chai");
const sandbox = require("sinon").createSandbox();
const mongoose = require("mongoose");
const tagDAO = require("../../daos/tag_dao");
const User = require("../../entities/User");

describe("tag_dao valid calls", function () {
  beforeEach(function () {
    sandbox.stub(User, "findOne").resolves({
      userId: "validUserIdentifier",
      tags: [
        { tagName: "tagNameToBeDeleted", tagEmote: "tagEmoteToBeDeleted" },
        { tagName: "newTagName", tagEmote: "newTagEmote" },
      ],
      cards: [
        {
          templateId: "templateId",
          recordedSerial: "recordedSerial",
          stars: 5,
          tagName: "tagNameToBeDeleted",
        },
      ],
    });
    sandbox.stub(User, "updateOne").resolves({ userId: "validUserIdentifier" });
  });

  afterEach(function () {
    sandbox.restore();
  });

  it("return user's tags", async function () {
    const result = await tagDAO.findTags("validUserIdentifier");
    expect(result.toString()).to.deep.equal(
      [
        { tagName: "tagNameToBeDeleted", tagEmote: "tagEmoteToBeDeleted" },
        { tagName: "newTagName", tagEmote: "newTagEmote" },
      ].toString()
    );
  });

  it("add a tag for user", async function () {
    requestBody = { tagName: "tagNameUnique", tagEmote: "tagEmoteUnique" };
    const result = await tagDAO.addTagForUser(requestBody);
    expect(result).to.have.property("userId");
  });

  it("delete a tag for user", async function () {
    requestBody = {
      tagName: "tagNameToBeDeleted",
      tagEmote: "tagEmoteToBeDeleted",
    };
    const result = await tagDAO.deleteTagForUser(requestBody);
    expect(result).to.have.property("userId");
  });

  it("updates tag information", async function () {
    requestBody = {
      tagName: "tagNameToBeDeleted",
      tagEmote: "tagEmoteToBeDeleted",
    };
    const result = await tagDAO.updateTagForUser(requestBody);
    expect(result).to.have.property("userId");
  });

  it("updates tag of user's card", async function () {
    requestBody = {
      tagName: "tagNameToBeDeleted",
      tagEmote: "tagEmoteToBeDeleted",
      newTagName: "newTagName",
      templateId: "templateId",
      recordedSerial: "recordedSerial",
      stars: 5,
    };
    const result = await tagDAO.updateTagUserCard(requestBody);
    expect(result).to.have.property("userId");
  });
});

describe("tag_dao invalid calls", function () {
  beforeEach(function () {
    sandbox.stub(User, "findOne").resolves({
      userId: "validUserIdentifier",
      tags: [
        { tagName: "tagNameToBeDeleted", tagEmote: "tagEmoteToBeDeleted" },
      ],
      cards: [
        {
          templateId: "templateId",
          recordedSerial: "recordedSerial",
          stars: 5,
          tagName: "tagNameToBeDeleted",
        },
      ],
    });
    sandbox.stub(User, "updateOne").resolves({ userId: "validUserIdentifier" });
  });

  afterEach(function () {
    sandbox.restore();
  });

  it("add existing tag for user", async function () {
    try {
      requestBody = {
        tagName: "tagNameToBeDeleted",
        tagEmote: "tagEmoteToBeDeleted",
      };
      await tagDAO.addTagForUser(requestBody);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.eql("Tag could not be added to user");
    }
  });

  it("delete non-existent tag for user", async function () {
    try {
      requestBody = {
        tagName: "nonExistentTagName",
        tagEmote: "nonExistentTagEmote",
      };
      await tagDAO.deleteTagForUser(requestBody);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.eql("Tag could not be deleted from user");
    }
  });

  it("updates non-existent tag", async function () {
    try {
      requestBody = {
        tagName: "nonExistentTagName",
        tagEmote: "nonExistentTagEmote",
      };
      await tagDAO.updateTagForUser(requestBody);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.eql("Tag could not be updated");
    }
  });
});
