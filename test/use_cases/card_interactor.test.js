const { expect } = require("chai");
const sandbox = require("sinon").createSandbox();
const mongoose = require("mongoose");
const cardInteractor = require("../../use_cases/card_interactor");
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

describe("card interactor", function () {
  beforeEach(function () {
    sandbox.stub(cardController, "getUserCards").resolves(mockCards);

    sandbox.stub(cardController, "getCardsByName").resolves(mockCards);

    sandbox.stub(cardController, "getCardsByGroup").resolves(mockCards);

    sandbox.stub(cardController, "getCardsByEra").resolves(mockCards);

    sandbox.stub(cardController, "getCardsByTag").resolves(mockCards);

    sandbox.stub(cardController, "getCardsBySerial").resolves(mockCards);

    sandbox.stub(cardController, "getCardsByStars").resolves(mockCards);

    sandbox.stub(cardController, "addCardToUser").resolves(mockCard);

    sandbox.stub(cardController, "claimCard").resolves(mockCard);

    sandbox.stub(cardController, "deleteCardFromUser").resolves(mockCard);

    sandbox.stub(cardController, "burnCard").resolves(mockCard);

    sandbox.stub(cardController, "upgradeCard").resolves(mockCard);
  });

  afterEach(function () {
    sandbox.restore();
  });

  it("return user's cards", async function () {
    const result = await cardInteractor.executeGetUserCards(
      cardController,
      "validUserIdentifier"
    );
    expect(result).to.have.property("cards");
  });

  it("return cards with name keyword", async function () {
    const result = await cardInteractor.executeGetCardsByName(
      cardController,
      "validUserIdentifier",
      "nameKeyWord"
    );
    expect(result).to.have.property("cards");
  });

  it("return cards with group keyword", async function () {
    const result = await cardInteractor.executeGetCardsByGroup(
      cardController,
      "validUserIdentifier",
      "groupKeyWord"
    );
    expect(result).to.have.property("cards");
  });

  it("return cards with era keyword", async function () {
    const result = await cardInteractor.executeGetCardsByEra(
      cardController,
      "validUserIdentifier",
      "eraKeyWord"
    );
    expect(result).to.have.property("cards");
  });

  it("return cards with serial number between the bounds", async function () {
    const result = await cardInteractor.executeGetCardsBySerial(
      cardController,
      "validUserIdentifier",
      "upperBound",
      "lowerBound"
    );
    expect(result).to.have.property("cards");
  });

  it("return cards with star value between the bounds", async function () {
    const result = await cardInteractor.executeGetCardsByStars(
      cardController,
      "validUserIdentifier",
      "upperBound",
      "lowerBound"
    );
    expect(result).to.have.property("cards");
  });

  it("return added card", async function () {
    const result = await cardInteractor.executeAddCardToUser(
      cardController,
      mockCard
    );
    expect(result).to.have.property("name");
  });

  it("return claimed card", async function () {
    const result = await cardInteractor.executeClaimCard(
      cardController,
      "templateId",
      mockCard
    );
    expect(result).to.have.property("name");
  });

  it("return added card", async function () {
    const result = await cardInteractor.executeDeleteCardFromUser(
      cardController,
      mockCard
    );
    expect(result).to.have.property("name");
  });

  it("return burnt card", async function () {
    const result = await cardInteractor.executeBurnCard(
      cardController,
      "templateId",
      mockCard
    );
    expect(result).to.have.property("name");
  });

  it("return upgraded card", async function () {
    const result = await cardInteractor.executeUpgradeCard(
      cardController,
      mockCard
    );
    expect(result).to.have.property("name");
  });
});
