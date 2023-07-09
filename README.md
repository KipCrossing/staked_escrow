# staked_escrow

An EVM smart contract for escrows where each party has a stake

WARNING: this is in WIP and has not been properly tested

## Features

Here are the primary features of this contract:

**deposit()**: The payer (buyer) can deposit funds into the contract. The deposit must be equal to amount (the cost of goods/services) plus a 25% stake.

**cancelEscrow()**: The payer can cancel the entire escrow before any trading has begun, in which case they receive a full refund.

**enterTrade()**: A merchant (seller) can enter into a trade by depositing 25% of amount as a stake. They also provide their contact details.

**cancelTrade()**: The merchant can cancel the trade and receive their staked amount back.

**completeTrade()**: The payer confirms the completion of the trade. The merchant receives the amount and their stake, and the payer gets back their staked amount.

The 25% stake from both payer and merchant provides a deterrent for fraudulent activity, as both parties risk losing something if they do not fulfill their end of the deal. The escrow system is designed to prevent scenarios where the payer sends funds and does not receive the agreed-upon goods/services, or where the merchant provides the goods/services but is not paid.

## NO WARRANTY

THIS SOFTWARE IS PROVIDED "AS IS" WITHOUT ANY WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. THE AUTHOR, OWNERS, AND CONTRIBUTORS DISCLAIM ANY LIABILITY FOR ANY DAMAGES ARISING FROM THE USE OR INABILITY TO USE THIS SOFTWARE. USE OF THIS SOFTWARE IS AT YOUR OWN RISK AND DISCRETION.
