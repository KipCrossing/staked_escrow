import { ethers, run } from "hardhat";
import fs from "fs";

async function main() {
  const StakedEscrow = await ethers.getContractFactory("StakedEscrow");
  const stakedEscrow = await StakedEscrow.deploy();
  await stakedEscrow.waitForDeployment();
  const escrowAddress = await stakedEscrow.getAddress();

  console.log("StakedEscrow deployed to:", escrowAddress);
  // write to file with fs
  fs.writeFileSync("escrowAddress.txt", escrowAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
