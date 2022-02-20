const { expect } = require("chai");
const sandbox = require("sinon").createSandbox();
const mongoose = require("mongoose");
const cardDAO = require("../../daos/card_dao");
const User = require("../../entities/User");
const Template = require("../../entities/Template");
const cardObject = {
  name: "name",
  group: "group",
  era: "era",
  photo: "photo",
  logo: "logo",
  tagName: "tag",
  recordedSerial: "50",
  stars: 3,
};
const invalidCardObject = {
  name: "name",
  group: "group",
  era: "era",
  photo: "photo",
  logo: "logo",
  tagName: "tag",
  recordedSerial: "50",
  stars: 5,
};
const newCardObject = {
  name: "newName",
  group: "newGroup",
  era: "newEra",
  photo: "newPhoto",
  logo: "newLogo",
  tagName: "newTag",
  recordedSerial: "51",
  stars: 4,
};
const templateObject = {
  name: "newName",
  group: "newGroup",
  era: "newEra",
  photo: "newPhoto",
  logo: "newLogo",
  serial: "52",
};

describe("card_dao valid tests", function () {
  beforeEach(function () {
    sandbox.stub(User, "findOne").resolves({
      userId: "validServerIdentifier",
      cards: [cardObject],
      tokens: 50,
    });

    sandbox.stub(User, "updateOne").resolves({
      updated: "updated",
    });

    sandbox.stub(Template, "findById").resolves(templateObject);
  });

  afterEach(function () {
    sandbox.restore();
  });

  it("return cards of user", async function () {
    const result = await cardDAO.findUserCards("validServerIdentifier");
    expect(result.toString()).to.deep.equal([cardObject].toString());
  });

  it("return cards that contains the keyword in their stage name", async function () {
    const result = await cardDAO.findCardsByName(
      "validServerIdentifier",
      "name"
    );
    expect(result.toString()).to.deep.equal([cardObject].toString());
  });

  it("return cards that contains the keyword in their group name", async function () {
    const result = await cardDAO.findCardsByGroup(
      "validServerIdentifier",
      "group"
    );
    expect(result.toString()).to.deep.equal([cardObject].toString());
  });

  it("return cards that contains the keyword in their era name", async function () {
    const result = await cardDAO.findCardsByEra("validServerIdentifier", "era");
    expect(result.toString()).to.deep.equal([cardObject].toString());
  });

  it("return cards that have a certain tag", async function () {
    const result = await cardDAO.findCardsByTag("validServerIdentifier", "tag");
    expect(result.toString()).to.deep.equal([cardObject].toString());
  });

  it("return cards that have a serial number within the bounds stated", async function () {
    const result = await cardDAO.findCardsBySerial(
      "validServerIdentifier",
      100,
      1
    );
    expect(result.toString()).to.deep.equal([cardObject].toString());
  });

  it("return cards that have a star number within the bounds stated", async function () {
    const result = await cardDAO.findCardsByStars(
      "validServerIdentifier",
      5,
      0
    );
    expect(result.toString()).to.deep.equal([cardObject].toString());
  });

  it("add card to user", async function () {
    const result = await cardDAO.addCardToUser(
      "validServerIdentifier",
      newCardObject
    );
    expect(result).to.have.property("updated");
  });

  it("add claimed card to user", async function () {
    const result = await cardDAO.addClaimedCardToUser(
      "validServerIdentifier",
      newCardObject,
      2
    );
    expect(result).to.have.property("updated");
  });

  it("delete card from user", async function () {
    const result = await cardDAO.deleteCardFromUser(
      "validServerIdentifier",
      newCardObject
    );
    expect(result).to.have.property("updated");
  });

  it("delete burnt card from user", async function () {
    const result = await cardDAO.deleteBurntCardFromUser(
      "validServerIdentifier",
      newCardObject,
      10
    );
    expect(result).to.have.property("updated");
  });

  it("update card information", async function () {
    const result = await cardDAO.updateCardStars(cardObject);
    expect(result).to.have.property("updated");
  });
});

describe("card_dao invalid tests", function () {
  beforeEach(function () {
    sandbox.stub(User, "findOne").resolves({
      userId: "validServerIdentifier",
      cards: [cardObject],
      tokens: 50,
    });

    sandbox.stub(User, "updateOne").resolves({
      updated: "updated",
    });

    sandbox.stub(Template, "findById").resolves(templateObject);
  });

  afterEach(function () {
    sandbox.restore();
  });

  it("update card information", async function () {
    try {
      await cardDAO.updateCardStars(invalidCardObject);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.eql("Card's stars could not be incremented");
    }
  });
});
