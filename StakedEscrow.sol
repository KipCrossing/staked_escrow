// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

contract StakedEscrow {
    string public name = "Staked Escrow";
    address public buyer;
    address public merchant;
    uint256 public amount;
    bool public isTrading;
    string public requestedGoodsDescription;
    bool public isDead;
    bool public isDeposited;
    string public merchantContactDetails;

    // Events
    event Deposit(address indexed _from, uint256 _value);
    event TradeEntered(address indexed _from, uint256 _value);
    event TradeCancelled(address indexed _from);
    event TradeCompleted(address indexed _from);
    event EscrowCancelled();

    constructor(
        address _buyer,
        address _merchant,
        uint256 _amount,
        string memory _requestedGoodsDescription
    ) {
        require(_amount % 4 == 0, "amount must be a multiple of 4");
        buyer = _buyer;
        merchant = _merchant;
        amount = _amount;
        requestedGoodsDescription = _requestedGoodsDescription;
    }


    function deposit() external payable {
        require(!isDead, "Escrow is dead");
        require(!isDeposited, "Deposit is already made");
        require(msg.sender == buyer, "Only buyer can deposit");
        require(msg.value == amount + amount/4, "Incorrect amount deposited");
        
        isDeposited = true;
        
        emit Deposit(msg.sender, msg.value);
    }

    function cancelEscrow() external {
        require(!isDead, "Escrow is dead");
        require(!isTrading, "Trade in progress");
        require(msg.sender == buyer, "Only buyer can cancel escrow");

        isDead = true;
        uint256 refundAmount = amount + amount/4;

        emit EscrowCancelled();

        (bool success, ) = payable(buyer).call{value: refundAmount}("");
        require(success, "Transfer failed");
    }

    function enterTrade() external payable {
        require(!isDead, "Escrow is dead");
        require(!isTrading, "Trade in progress");
        require(msg.value == amount/4, "Incorrect amount deposited");
        require(msg.sender == merchant, "Only the valid merchant can enter trade");

        isTrading = true;

        emit TradeEntered(msg.sender, msg.value);
    }

    function cancelTrade() external {
        require(!isDead, "Escrow is dead");
        require(isTrading, "Trade must be in progress to cancel");
        require(msg.sender == merchant, "Only merchant can cancel");

        isTrading = false;
        uint256 refundAmount = amount/4;

        emit TradeCancelled(msg.sender);

        (bool success, ) = payable(merchant).call{value: refundAmount}("");
        require(success, "Transfer failed");
    }

    function completeTrade() external {
        require(!isDead, "Escrow is dead");
        require(isTrading, "Trade must be in progress to complete");
        require(msg.sender == buyer, "Only buyer can complete");

        isTrading = false;
        isDead = true;
        uint256 purchaseAmount = amount;
        uint256 stakeAmount = amount/4;

        emit TradeCompleted(msg.sender);

        (bool merchantSuccess, ) = payable(merchant).call{value: purchaseAmount + stakeAmount}("");
        require(merchantSuccess, "Transfer to merchant failed");
        (bool buyerSuccess, ) = payable(buyer).call{value: stakeAmount}("");
        require(buyerSuccess, "Transfer to buyer failed");
    }
}