pragma solidity ^0.4.24;


import "./erc20.sol";
import "./safemath.sol";

contract SellFactory is ERC20_Token {

  using SafeMath for uint256;  

  struct  Sale {
      string saleType;
      uint units;
      string location;
      string expetedDeliveryDate;
  }
  
  Sale[] public sales;
  mapping (uint => address) public saleToOwner;
  mapping (address => uint) public ownerToUnits;
  mapping (address => uint) ownerSaleCount;
  mapping (address => mapping (address => uint256)) public biddingApproval;


  function createSale(string _saleType, uint _units, string _location, string _expectedTime) public {
    uint saleId = sales.push(Sale(_saleType, _units,  _location, _expectedTime)) - 1;
    saleToOwner[saleId] = msg.sender;
    ownerSaleCount[msg.sender].add(1);
    ownerToUnits[msg.sender].add(_units);
  }

  function getSalesCount() public constant returns(uint) {
    return sales.length;
  }

  function getSale(uint _indexId) public view returns(string saleType, uint units, string location, string expetedDeliveryDate) {
    return (sales[_indexId].saleType, 
      sales[_indexId].units, 
      sales[_indexId].location, 
      sales[_indexId].expetedDeliveryDate);
  }
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
        if (ownerToUnits[from] < value) revert();                 // Check if the sender has enough
        if (ownerToUnits[to] + value < ownerToUnits[to]) revert();  // Check for overflows
        _; 
    }

    /**
     * Returns the total amount of tokens
     * @return total amount
     */
    function totalSupply() public constant returns(uint256 _totalSupply) {
        return ownerToUnits[msg.sender];
    }

    /**
     * Returns The balance of a given account
     * @param addr Address of the account
     * @return Balance
     */
    function balanceOf(address addr) public constant returns(uint256 balance) {
        return ownerToUnits[addr];
    }
    
    /**
     * Returns the amount which _spender is still allowed to withdraw from _owner
     */
    function allowance(address _owner, address _spender) public constant returns (uint256 remaining) {
        return ownerToUnits[_owner];    
    }

    /**
     * Send coins
     * @param _to        The recipient of tokens
     * @param _value     Amount of tokens to send 
     */
     function transfer(address _to, uint256 _value) public No0x(_to) ValidBalance(msg.sender, _to, _value) 
     returns (bool success) {                        
        ownerToUnits[msg.sender].sub(_value);                      // Subtract from the sender
        ownerToUnits[_to].add(_value);                             // Add the same to the recipient
        Transfer(msg.sender, _to, _value);                   // Notify anyone listening that this transfer took place
        return true;
    }

    /**
     * Allow another contract to spend some tokens in your behalf
     * @param _spender     Account that can take some of your tokens
     * @param _value       Max amount of tokens the _spender account can take
     * @return {return}    Return true if the action succeeded
     */
    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        Approval(msg.sender, _spender, _value);
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
        if (_value > allowance[_from][msg.sender]) revert();     // Check allowance
        balances[_from] -= _value;                               // Subtract from the sender
        balances[_to] += _value;                                 // Add the same to the recipient
        allowance[_from][msg.sender] -= _value;
        Transfer(_from, _to, _value);
        return true;
    }
}
