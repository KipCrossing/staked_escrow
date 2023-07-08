// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

contract StakedEscrow {
    string public name = "Staked Escrow";
    address public payer;
    address public merchant;
    uint256 public amount;
    bool public isTrading;
    string public requestedGoodsDescription;
    bool public isDead;
    string public merchantContactDetails; // Add contact details string

    // Events
    event Deposit(address indexed _from, uint256 _value);
    event TradeEntered(address indexed _from, uint256 _value);
    event TradeCancelled(address indexed _from);
    event TradeCompleted(address indexed _from);
    event EscrowCancelled();

    constructor(
        uint256 _amount,
        address _payer,
        string memory _requestedGoodsDescription
    ) {
        require(_amount % 4 == 0, "amount must be a multiple of 4");
        amount = _amount;
        payer = _payer;
        requestedGoodsDescription = _requestedGoodsDescription;
    }

    error TradeInProgress();
    error DeadEscrow();

    function deposit() external payable {
        require(!isDead, "Escrow is dead");
        require(msg.sender == payer, "Only payer can deposit");
        require(msg.value == amount + amount/4, "Incorrect amount deposited");
        emit Deposit(msg.sender, msg.value);
    }

    function cancelEscrow() external {
        require(!isDead, "Escrow is dead");
        require(!isTrading, "Trade in progress");
        require(msg.sender == payer, "Only payer can cancel");

        isDead = true;
        uint256 refundAmount = amount + amount/4;

        emit EscrowCancelled();

        (bool success, ) = payable(payer).call{value: refundAmount}("");
        require(success, "Transfer failed");
    }

    function enterTrade(string memory _contactDetails) external payable {
        require(!isDead, "Escrow is dead");
        require(!isTrading, "Trade in progress");
        require(msg.value == amount/4, "Incorrect amount deposited");

        merchant = msg.sender;
        isTrading = true;
        merchantContactDetails = _contactDetails; 

        emit TradeEntered(msg.sender, msg.value);
    }

    function cancelTrade() external {
        require(!isDead, "Escrow is dead");
        require(msg.sender == merchant, "Only merchant can cancel");

        isTrading = false;
        uint256 refundAmount = amount/4;

        emit TradeCancelled(msg.sender);

        (bool success, ) = payable(merchant).call{value: refundAmount}("");
        require(success, "Transfer failed");
    }

    function completeTrade() external {
        require(!isDead, "Escrow is dead");
        require(msg.sender == payer, "Only payer can complete");

        isTrading = false;
        isDead = true;
        uint256 merchantAmount = amount;
        uint256 payerAmount = amount/4;

        emit TradeCompleted(msg.sender);

        (bool merchantSuccess, ) = payable(merchant).call{value: merchantAmount}("");
        require(merchantSuccess, "Transfer to merchant failed");
        (bool payerSuccess, ) = payable(payer).call{value: payerAmount}("");
        require(payerSuccess, "Transfer to payer failed");
    }
}