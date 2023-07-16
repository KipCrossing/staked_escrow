import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

const INFURA_API_KEY = process.env.INFURA_API_KEY!.toString();
const ETH_PRIVATE_KEY = process.env.ETH_PRIVATE_KEY!.toString();

module.exports = {
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [ETH_PRIVATE_KEY],
    },
  },
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 40000,
  },
};
