pragma solidity ^0.4.24;


import "./erc20.sol";
import "./safemath.sol";
import "./bidderFactory.sol";

contract BidderAccount is BidderFactory, ERC20_Token {
	using SafeMath for uint256;  

	/**
     * Prevent an account from behing 0x0
     * @param addr Address to check
     */
    modifier No0x(address addr) { 
        if (addr == 0x0) revert();
        _; 
    }

    /**
     * A modifer to check validity of a balance for a transfer
     * from an account to another.
     * @param from  [description]
     * @param to    [description]
     * @param value [description]
     */
    modifier ValidBalance(address from, address to, uint256 value) { 
        if (userToCoin[from] < value) revert();                 // Check if the sender has enough
        if (userToCoin[to] + value < userToCoin[to]) revert();  // Check for overflows
        _; 
    }

    /**
     * Returns the total amount of tokens
     * @return total amount
     */
    function totalSupply() public constant returns(uint256 _totalSupply) {
        return userToCoin[msg.sender];
    }

    /**
     * Returns The balance of a given account
     * @param addr Address of the account
     * @return Balance
     */
    function balanceOf(address addr) public constant returns(uint256 balance) {
        return userToCoin[addr];
    }

    function approveTransaction (address _to, uint _bidId) external No0x(_to) returns(bool res) {
    	require(bids[_bidId].exists, "Bid is not exists");
    	
    	userToCoin[_to].add(bids[_bidId].amount);     
        _revertBidToOthers(_to, bids[_bidId].saleId);                             
        emit Transfer(msg.sender, _to, bids[_bidId].amount);                   // Notify anyone listening that this transfer took place
        return true;
    }
    

    /**
     * Send coins
     * @param _to        The recipient of tokens
     * @param _value     Amount of tokens to send 
     */
     function transfer(address _to, uint256 _value) public No0x(_to) ValidBalance(msg.sender, _to, _value) 
     returns (bool success) {      
        userToCoin[msg.sender].sub(_value);                      // Subtract from the sender
        userToCoin[_to].add(_value);                                  
        emit Transfer(msg.sender, _to, _value);                   // Notify anyone listening that this transfer took place
        return true;
    }

    /**
     * Allow another contract to spend some tokens in your behalf
     * @param _spender     Account that can take some of your tokens
     * @param _value       Max amount of tokens the _spender account can take
     * @return {return}    Return true if the action succeeded
     */
    function approve(address _spender, uint256 _value) public returns (bool success) {
        emit Approval(msg.sender, _spender, _value);
        return true;
    }  

    /**
     * A contract attempts to get the coins
     * @param _from     Address holding the tokens to transfer
     * @param _to       Account to send the coins to
     * @param _value    How many tokens     
     * @return {bool}   Whether the call was successful
     */
    function transferFrom(address _from, address _to, uint256 _value) public No0x (_to) ValidBalance(_from, _to, _value)
    returns (bool success) {
        userToCoin[msg.sender].sub(_value);                          // Subtract from the sender
        userToCoin[_to].add(_value);                                 // Add the same to the recipient
        emit Transfer(_from, _to, _value);
        return true;
    }

}