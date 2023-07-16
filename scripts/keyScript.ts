import { ethers } from "ethers";

import dotenv from "dotenv";

dotenv.config();

const ETH_PRIVATE_KEY = process.env.ETH_PRIVATE_KEY!.toString();
const ETH_PUBLIC_KEY = process.env.ETH_PUBLIC_KEY!.toString();
const INFURA_API_KEY = process.env.INFURA_API_KEY!.toString();

function generatePrivateKey() {
  const randomBytes = ethers.randomBytes(32);
  const privateKey = ethers.hexlify(randomBytes);
  console.log("Ethereum Private Key:", privateKey);
}

function calcPubkey() {
  // Create a new Wallet instance
  const wallet = new ethers.Wallet(ETH_PRIVATE_KEY);
  console.log("Ethereum Address:", wallet.address);
}

async function checkBalance() {
  // replace 'yourInfuraProjectId' with your actual Infura Project ID
  const provider = new ethers.JsonRpcProvider(
    `https://sepolia.infura.io/v3/${INFURA_API_KEY}`
  );

  const balanceWei = await provider.getBalance(ETH_PUBLIC_KEY);
  const balanceEther = ethers.formatEther(balanceWei);

  console.log(`Balance: ${balanceEther} Ether`);
}

checkBalance().catch(console.error);

// calcPubkey();

// generatePrivateKey();
