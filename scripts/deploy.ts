import { ethers } from "hardhat";

async function main() {
  // ! WARNING: these are only example addresses, do not use them in production!
  const _buyer = "0xAddress1";
  const _merchant = "0xAddress2";
  const _amount = ethers.parseEther("0.1");
  const _requestedGoodsDescription = "Test goods";

  const SingleStakedEscrow = await ethers.getContractFactory(
    "SingleStakedEscrow"
  );
  const escrow = await SingleStakedEscrow.deploy(
    _buyer,
    _merchant,
    _amount,
    _requestedGoodsDescription
  );

  console.log("Deploying contract...");
  await escrow.waitForDeployment();
  const escrowAddress = await escrow.getAddress();
  console.log("Contract deployed to:", escrowAddress);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
