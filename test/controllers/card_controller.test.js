const { expect } = require("chai");
const sandbox = require("sinon").createSandbox();
const mongoose = require("mongoose");
const cardDAO = require("../../daos/card_dao");
const cardController = require("../../controllers/card_controller");
const User = require("../../entities/User");
const mockCards = { cards: [] };
const mockCard = {
  name: "name",
  group: "group",
  era: "era",
  photo: "photo",
  logo: "logo",
  recordedSerial: "100",
  stars: 3,
  tagName: "tagName",
};

describe("card controller", function () {
  beforeEach(function () {
    sandbox.stub(cardDAO, "findUserCards").resolves(mockCards);
    sandbox.stub(cardDAO, "findCardsByName").resolves(mockCards);
    sandbox.stub(cardDAO, "findCardsByGroup").resolves(mockCards);
    sandbox.stub(cardDAO, "findCardsByEra").resolves(mockCards);
    sandbox.stub(cardDAO, "findCardsByTag").resolves(mockCards);
    sandbox.stub(cardDAO, "findCardsBySerial").resolves(mockCards);
    sandbox.stub(cardDAO, "findCardsByStars").resolves(mockCards);
    sandbox.stub(cardDAO, "addCardToUser").resolves(mockCard);
    sandbox.stub(cardDAO, "addClaimedCardToUser").resolves(mockCard);
    sandbox.stub(cardDAO, "deleteCardFromUser").resolves(mockCard);
    sandbox.stub(cardDAO, "deleteBurntCardFromUser").resolves(mockCard);
    sandbox.stub(cardDAO, "updateCardStars").resolves(mockCard);
  });

  afterEach(function () {
    sandbox.restore();
  });

  it("return user's cards", async function () {
    const result = await cardController.getUserCards("validUserIdentifier");
    expect(result).to.have.property("cards");
  });

  it("return user's cards with matching name", async function () {
    const result = await cardController.getCardsByName(
      "validUserIdentifier",
      "keyWord"
    );
    expect(result).to.have.property("cards");
  });

  it("return user's cards with matching group", async function () {
    const result = await cardController.getCardsByGroup(
      "validUserIdentifier",
      "keyWord"
    );
    expect(result).to.have.property("cards");
  });

  it("return user's cards with matching era", async function () {
    const result = await cardController.getCardsByEra(
      "validUserIdentifier",
      "keyWord"
    );
    expect(result).to.have.property("cards");
  });

  it("return user's cards with matching tag", async function () {
    const result = await cardController.getCardsByTag(
      "validUserIdentifier",
      "keyWord"
    );
    expect(result).to.have.property("cards");
  });

  it("throw error due to undefined tag name", async function () {
    try {
      await cardController.getCardsByTag("validUserIdentifier", undefined);
    } catch (error) {
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.eql("the tag name is undefined");
    }
  });

  it("return user's cards with serial number within the bounds", async function () {
    const result = await cardController.getCardsBySerial(
      "validUserIdentifier",
      "upperBound",
      "lowerBound"
    );
    expect(result).to.have.property("cards");
  });
  it("return user's cards with star number within the bounds", async function () {
    const result = await cardController.getCardsByStars(
      "validUserIdentifier",
      "upperBound",
      "lowerBound"
    );
    expect(result).to.have.property("cards");
  });

  it("return user's cards with star number within the bounds", async function () {
    const result = await cardController.getCardsByStars(
      "validUserIdentifier",
      "upperBound",
      "lowerBound"
    );
    expect(result).to.have.property("cards");
  });

  it("return added card to user", async function () {
    const result = await cardController.addCardToUser(mockCard);
    expect(result).to.have.property("name");
  });

  it("return claimed card by user", async function () {
    const result = await cardController.claimCard("templateId", mockCard);
    expect(result).to.have.property("name");
  });

  it("return deleted card from user", async function () {
    const result = await cardController.deleteCardFromUser(mockCard);
    expect(result).to.have.property("name");
  });

  it("return burnt card by user", async function () {
    const result = await cardController.burnCard("templateId", mockCard);
    expect(result).to.have.property("name");
  });

  it("return upgraded card from user", async function () {
    const result = await cardController.upgradeCard(mockCard);
    expect(result).to.have.property("name");
  });
});
