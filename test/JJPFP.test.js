const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("ERC721 Token contract", () => {
  async function deployContractFixture() {
    const Token = await ethers.getContractFactory("JJPFP");
    const [owner, ...rest] = await ethers.getSigner();

    const hardhatToken = await Token.deploy();

    await hardhatToken.deployed();

    return { Token, hardhatToken, owner, rest };
  }

  it("Check initial state", async () => {
    const { hardhatToken } = await loadFixture(deployContractFixture);

    expect(await hardhatToken.name()).to.equal("JJ PFP");
  });
});
