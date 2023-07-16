import { ethers, run } from "hardhat";

async function main() {
  const StakedEscrow = await ethers.getContractFactory("StakedEscrow");
  const stakedEscrow = await StakedEscrow.deploy();
  await stakedEscrow.waitForDeployment();
  const escrowAddress = await stakedEscrow.getAddress();

  console.log("StakedEscrow deployed to:", escrowAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
