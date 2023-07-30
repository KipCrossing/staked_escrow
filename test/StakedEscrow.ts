import { ethers } from "hardhat";
import { expect } from "chai";

describe("StakedEscrow", function () {
  let StakedEscrow: any;
  let owner: any, addr1: any, addr2: any;
  let ownerAddress: any, addr1Address: any, addr2Address: any;

  before(async function () {
    StakedEscrow = await ethers.getContractFactory("StakedEscrow");
    [owner, addr1, addr2] = await ethers.getSigners();
    ownerAddress = await owner.getAddress();
    addr1Address = await addr1.getAddress();
    addr2Address = await addr2.getAddress(); // Added this line
  });

  it("Should create new escrow", async function () {
    const contract = await StakedEscrow.deploy();
    const amount = ethers.parseEther("20");

    await expect(
      contract.connect(addr1).createEscrow(amount, "escrow_details", {
        value: ethers.parseEther("5"),
      })
    )
      .to.emit(contract, "EscrowCreated")
      .withArgs(0, addr1Address, amount);

    await expect(
      contract.connect(addr1).createEscrow(amount, "escrow_details", {
        value: ethers.parseEther("5"),
      })
    )
      .to.emit(contract, "EscrowCreated")
      .withArgs(1, addr1Address, amount);

    const escrowIDs: number[] = await contract.getMerchantEscrows(addr1Address);
    // console.log(escrowIDs);
    expect(escrowIDs[0]).to.equal(0);
    expect(escrowIDs[1]).to.equal(1);
    const escrow = await contract.escrows(0);
    expect(escrow.merchant).to.equal(addr1Address);
    expect(escrow.amount).to.equal(amount);
    expect(escrow.details).to.equal("escrow_details");
    expect(escrow.complete).to.equal(false);
  });

  it("Should deposit into escrow", async function () {
    const contract = await StakedEscrow.deploy();
    const amount = ethers.parseEther("20");
    await contract.connect(addr1).createEscrow(amount, "escrow_details", {
      value: ethers.parseEther("5"),
    });
    await contract.connect(addr1).createEscrow(amount, "escrow_details", {
      value: ethers.parseEther("5"),
    });
    await expect(
      contract.connect(addr2).deposit(1, { value: ethers.parseEther("25") })
    )
      .to.emit(contract, "Deposit")
      .withArgs(1, addr2Address, ethers.parseEther("25"));

    const escrow = await contract.escrows(1);
    expect(escrow.buyer).to.equal(addr2Address);
    expect(escrow.complete).to.equal(false);
    const escrowIDs: number[] = await contract.getBuyerEscrows(addr2Address);
    console.log(escrowIDs);
    expect(escrowIDs[0]).to.equal(1);
  });

  it("Should cancel escrow", async function () {
    const contract = await StakedEscrow.deploy();
    const amount = ethers.parseEther("20");
    await contract.connect(addr1).createEscrow(amount, "escrow_details", {
      value: ethers.parseEther("5"),
    });
    await contract
      .connect(addr2)
      .deposit(0, { value: ethers.parseEther("25") });

    await expect(contract.connect(addr1).cancelEscrow(0))
      .to.emit(contract, "EscrowCancelled")
      .withArgs(0);

    const escrow = await contract.escrows(0);
    expect(escrow.isDead).to.equal(true);
    expect(escrow.complete).to.equal(false);
  });

  it("Should complete trade", async function () {
    const contract = await StakedEscrow.deploy();
    const amount = ethers.parseEther("20");
    await contract.connect(addr1).createEscrow(amount, "escrow_details", {
      value: ethers.parseEther("5"),
    });
    await contract
      .connect(addr2)
      .deposit(0, { value: ethers.parseEther("25") });

    await expect(contract.connect(addr2).completeTrade(0))
      .to.emit(contract, "TradeCompleted")
      .withArgs(0, addr2Address);

    const escrow = await contract.escrows(0);
    expect(escrow.isDead).to.equal(true);
    expect(escrow.complete).to.equal(true);
  });
});
