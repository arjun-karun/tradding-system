pragma solidity ^0.4.24;

contract SellFactory {

  struct  Sale {
      string saleType;
      uint units;
      string location;
      string expetedDeliveryDate;
  }

  Sale[] public sales;
  mapping (uint => address) public saleToOwner;
  mapping (address => uint) ownerSaleCount;


  function createSale(string _saleType, uint _units, string _location, string _expectedTime) public {
    uint saleId = sales.push(Sale(_saleType, _units,  _location, _expectedTime)) - 1;
    saleToOwner[saleId] = msg.sender;
    ownerSaleCount[msg.sender]++;
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
}
