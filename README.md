# StakedEscrow

An EVM smart contract for escrows where each party has a stake.

A 25% stake from both payer and merchant provides a deterrent for fraudulent activity, as both parties risk losing something if they do not fulfill their end of the deal. The escrow system is designed to prevent scenarios where the payer sends funds and does not receive the agreed-upon goods/services, or where the merchant provides the goods/services but funds are not released.

WARNING: this is in WIP and has not been properly tested

## Features

Here are the primary features of the `StakedEscrow` contract:

**createEscrow(uint256 \_amount, string memory \_details) public payable returns(uint256)**

This function is used to create a new escrow. The merchant calls this function, specifying the total trade amount and details. It then creates a new escrow and returns the unique ID of the escrow.

**deposit(uint256 \_escrowId) external payable**

This function is used by the buyer to deposit the funds necessary to cover the trade and their stake. The function checks if the escrow hasn't already been completed or cancelled, and that no buyer has been set yet. It also checks that the buyer is depositing exactly the right amount (the total trade amount plus 25% as a stake). The buyer's address is then recorded.

**cancelEscrow(uint256 \_escrowId) external**

This function allows the _merchant_ to cancel the escrow. It refunds the buyer (if there is one) and the merchant the amounts they put into the contract.

**completeTrade(uint256 \_escrowId) external**

This function allows the _buyer_ to mark the trade as completed. It marks the escrow as completed and transfers the total trade amount to the merchant (plus stake) and refunds the buyer's stake.

## Project

### Setup

#### Hardhat

Compile the project with [hardhat](https://hardhat.org/hardhat-runner/docs/getting-started#installation)

```
npx hardhat compile
```

run tests

```
npx hardhat test
```

## NO WARRANTY

THIS SOFTWARE IS PROVIDED "AS IS" WITHOUT ANY WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. THE AUTHOR, OWNERS, AND CONTRIBUTORS DISCLAIM ANY LIABILITY FOR ANY DAMAGES ARISING FROM THE USE OR INABILITY TO USE THIS SOFTWARE. USE OF THIS SOFTWARE IS AT YOUR OWN RISK AND DISCRETION.
