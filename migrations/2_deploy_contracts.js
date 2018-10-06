var SellFactory = artifacts.require("./SellFactory.sol");
var BidderAccount = artifacts.require("./BidderAccount.sol");
var BidderFactory= artifacts.require("./BidderFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(SellFactory);
  deployer.deploy(BidderAccount);
  deployer.deploy(BidderFactory);
};
