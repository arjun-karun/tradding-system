pragma solidity ^0.4.24;


import "./erc20.sol";
import "./safemath.sol";
import "./ownable.sol";

contract BidderFactory is Ownable {

    using SafeMath for uint256;  

    mapping (uint => uint) saleToBidCount;
    mapping (address => uint) userToCoin;

    uint powerCoinFee = 0.00001 ether;

    struct Bid {
        uint amount;
        uint saleId;
        address bidder;
        uint timestamp;
        bool exists;
    }
    Bid[] public bids;

    function setPowerCoinFee(uint _fee) public {
        powerCoinFee = _fee;
    }

    function _revertBidToOthers (address _owner, uint _saleId ) internal view  {
        for (uint i = 0; i < bids.length; i++) {
          if (bids[i].saleId == _saleId && bids[i].bidder != _owner) {
                userToCoin[msg.sender].add(bids[i].amount);
          }
        }
    }

    function placeBid (uint _saleId, uint _amount) external  {
        bids.push(Bid(_amount, _saleId, msg.sender, uint(now), true));
        saleToBidCount[_saleId].add(1);
        userToCoin[msg.sender].sub(_amount);
    }

    function withdraw() external onlyOwner {
        owner.transfer(this.balance);
    }

    function buyCoin(uint _coinCount) external payable {
        require(msg.value == _coinCount * powerCoinFee);
        userToCoin[msg.sender] = userToCoin[msg.sender] + _coinCount;
    }

    function getBidById(uint _indexId) external view returns(uint, address, uint)
    {
        return (bids[_indexId].amount, 
          bids[_indexId].bidder, 
          bids[_indexId].timestamp 
        );
    }

    function getBidsBySales(uint _saleId) external view returns(uint[]) {
        uint[] memory result = new uint[](saleToBidCount[_saleId]);
        uint counter = 0;
        for (uint i = 0; i < bids.length; i++) {
          if (bids[i].saleId == _saleId) {
            result[counter] = i;
            counter++;
          }
        }
        return result;
  }
    
}

