const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("JJ PFP Contract", () => {
  async function deployFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("JJPFP");
    const contract = await Token.deploy();

    return { contract, owner, otherAccount };
  }

  it("Contract Info", async () => {
    const { contract, owner } = await loadFixture(deployFixture);

    expect(await contract.name()).to.equal("JJ PFP");
    expect(await contract.symbol()).to.equal("JJ");
    expect(await contract.owner()).to.equal(owner.address);
  });

  describe("Mint NFT", async () => {
    it("can call safeMint", async () => {
      const { contract, owner } = await loadFixture(deployFixture);

      expect(await contract.totalSupply()).to.equal(0);
      expect(await contract.balanceOf(owner.address)).to.equal(0);

      await contract.safeMint(owner.address);

      expect(await contract.totalSupply()).to.equal(1);
      expect(await contract.balanceOf(owner.address)).to.equal(1);
    });

    it("tokenURI", async () => {
      const { contract, owner } = await loadFixture(deployFixture);

      await contract.safeMint(owner.address);

      expect(await contract.tokenURI(1)).to.equal(
        "https://pfp.konojunya.com/token/1.json"
      );
    });

    // it("can not call safeMint, cause not owner", async () => {
    //   const { contract, otherAccount } = await loadFixture(deployFixture);

    //   expect(await contract.totalSupply()).to.equal(0);

    //   try {
    //     await contract.safeMint(otherAccount.address);
    //   } catch (e) {
    //     console.log(e);
    //   }

    //   expect(await contract.totalSupply()).to.equal(0);
    // });
  });
});
