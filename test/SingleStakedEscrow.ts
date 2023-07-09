import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("SingleStakedEscrow", function () {
  async function deployEscrowFixture() {
    const amount = ethers.parseEther("0.1"); // 1 Ether
    const description = "Test goods";

    const [buyer, merchant] = await ethers.getSigners();
    const buyerAddress = await buyer.getAddress();
    const merchantAddress = await merchant.getAddress();

    const Escrow = await ethers.getContractFactory("SingleStakedEscrow");
    const escrow = await Escrow.deploy(
      buyerAddress,
      merchantAddress,
      amount,
      description
    );

    return { escrow, buyer, merchant, amount, description };
  }

  describe("Deployment", function () {
    it("should set the right values during contract creation", async function () {
      const { escrow, amount, description } = await loadFixture(
        deployEscrowFixture
      );
      expect(await escrow.name()).to.equal("Staked Escrow");
      expect(await escrow.isTrading()).to.equal(false);
      expect(await escrow.isDeposited()).to.equal(false);
      expect(await escrow.isDead()).to.equal(false);
      expect(await escrow.requestedGoodsDescription()).to.equal(description);
    });
  });

  describe("Deposit", function () {
    it("should allow buyer to deposit the correct amount", async function () {
      const { escrow, buyer, amount } = await loadFixture(deployEscrowFixture);
      let quarterAmount = amount / BigInt(4);
      let totalAmount = amount + quarterAmount;
      await escrow.connect(buyer).deposit({ value: totalAmount });
      expect(await escrow.isDeposited()).to.equal(true);
    });

    it("should not allow anyone other than the buyer to deposit", async function () {
      const { escrow, merchant, amount } = await loadFixture(
        deployEscrowFixture
      );
      let quarterAmount = amount / BigInt(4);
      let totalAmount = amount + quarterAmount;
      await expect(
        escrow.connect(merchant).deposit({ value: totalAmount })
      ).to.be.revertedWith("Only buyer can deposit");
    });

    it("should not allow buyer to deposit incorrect amount", async function () {
      const { escrow, buyer, amount } = await loadFixture(deployEscrowFixture);
      await expect(
        escrow.connect(buyer).deposit({ value: amount })
      ).to.be.revertedWith("Incorrect amount deposited");
    });

    it("should not allow buyer to deposit more than once", async function () {
      const { escrow, buyer, amount } = await loadFixture(deployEscrowFixture);
      let quarterAmount = amount / BigInt(4);
      let totalAmount = amount + quarterAmount;
      await escrow.connect(buyer).deposit({ value: totalAmount });
      await expect(
        escrow.connect(buyer).deposit({ value: totalAmount })
      ).to.be.revertedWith("Deposit is already made");
    });
  });

  describe("Trading", function () {
    it("should allow merchant to enter trade", async function () {
      const { escrow, buyer, merchant, amount } = await loadFixture(
        deployEscrowFixture
      );
      let quarterAmount = amount / BigInt(4);
      let totalAmount = amount + quarterAmount;
      await escrow.connect(buyer).deposit({ value: totalAmount });
      await escrow.connect(merchant).enterTrade({ value: quarterAmount });
      expect(await escrow.isTrading()).to.equal(true);
    });

    it("should not allow anyone other than the merchant to enter trade", async function () {
      const { escrow, buyer, amount } = await loadFixture(deployEscrowFixture);
      let quarterAmount = amount / BigInt(4);
      let totalAmount = amount + quarterAmount;
      await escrow.connect(buyer).deposit({ value: totalAmount });
      await expect(
        escrow.connect(buyer).enterTrade({ value: quarterAmount })
      ).to.be.revertedWith("Only the valid merchant can enter trade");
    });

    it("should allow buyer to complete the trade", async function () {
      const { escrow, buyer, merchant, amount } = await loadFixture(
        deployEscrowFixture
      );
      let quarterAmount = amount / BigInt(4);
      let totalAmount = amount + quarterAmount;
      await escrow.connect(buyer).deposit({ value: totalAmount });
      await escrow.connect(merchant).enterTrade({ value: quarterAmount });
      await escrow.connect(buyer).completeTrade();
      expect(await escrow.isTrading()).to.equal(false);
      expect(await escrow.isDead()).to.equal(true);
    });

    it("should not allow merchant to complete the trade", async function () {
      const { escrow, buyer, merchant, amount } = await loadFixture(
        deployEscrowFixture
      );
      let quarterAmount = amount / BigInt(4);
      let totalAmount = amount + quarterAmount;
      await escrow.connect(buyer).deposit({ value: totalAmount });
      await escrow.connect(merchant).enterTrade({ value: quarterAmount });
      await expect(escrow.connect(merchant).completeTrade()).to.be.revertedWith(
        "Only buyer can complete"
      );
    });
  });
});
