// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.18;

contract StakedEscrow {
    string public name = "Staked Escrow";
    uint256 public nextEscrowId = 0;

    struct Escrow {
        address buyer;
        address merchant;
        uint256 amount;
        string details;
        bool isDead;
    }

    mapping(uint256 => Escrow) public escrows;

    // Events
    event Deposit(uint256 indexed _escrowId, address indexed _from, uint256 _value);
    event TradeCompleted(uint256 indexed _escrowId, address indexed _from);
    event EscrowCancelled(uint256 indexed _escrowId);

    function createEscrow(
        uint256 _amount,
        string memory _details
    ) public payable returns(uint256) {
        require(_amount % 4 == 0, "amount must be a multiple of 4");
        require(msg.value == _amount/4, "Must deposit 25% of amount as stake");

        uint256 escrowId = nextEscrowId++;
        escrows[escrowId] = Escrow({
            buyer: address(0),
            merchant: msg.sender,
            amount: _amount,
            details: _details,
            isDead: false
        });

        return escrowId;
    }


    function deposit(uint256 _escrowId) external payable {
        Escrow storage escrow = escrows[_escrowId];
        require(!escrow.isDead, "Escrow is dead");
        require(escrow.buyer == address(0), "A buyer is already set");
        require(msg.value == escrow.amount + escrow.amount/4, "Incorrect amount deposited");

        escrow.buyer = msg.sender;

        emit Deposit(_escrowId, msg.sender, msg.value);
    }

    function cancelEscrow(uint256 _escrowId) external {
        Escrow storage escrow = escrows[_escrowId];
        require(!escrow.isDead, "Escrow is dead");
        require(msg.sender == escrow.merchant, "Only merchant can cancel escrow");

        escrow.isDead = true;
        uint256 refundAmount = escrow.amount + escrow.amount/4;

        emit EscrowCancelled(_escrowId);

        if (!(escrow.buyer == address(0))) {
            (bool buyerSuccess, ) = payable(escrow.buyer).call{value: refundAmount}("");
            require(buyerSuccess, "Buyer Transfer failed");
        }

        (bool merchantSuccess, ) = payable(escrow.merchant).call{value: escrow.amount/4}("");
        require(merchantSuccess, "Merchant Transfer failed");
    }

    function completeTrade(uint256 _escrowId) external {
        Escrow storage escrow = escrows[_escrowId];
        require(!escrow.isDead, "Escrow is dead");
        require(!(escrow.buyer == address(0)), "Buyer not set");
        require(msg.sender == escrow.buyer, "Only buyer can complete trade");
        
        
        escrow.isDead = true;
        uint256 payAmount = escrow.amount + escrow.amount/4;

        emit TradeCompleted(_escrowId, msg.sender);

        (bool buyerSuccess, ) = payable(escrow.buyer).call{value: escrow.amount/4}("");
        require(buyerSuccess, "Buyer Transfer failed");

        (bool merchantSuccess, ) = payable(escrow.merchant).call{value: payAmount}("");
        require(merchantSuccess, "Merchant Transfer failed");

    }

}