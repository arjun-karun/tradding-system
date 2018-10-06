var SellFactory = artifacts.require("./SellFactory.sol");
var BidderAccount = artifacts.require("./BidderAccount.sol");

module.exports = function(deployer) {
  deployer.deploy(SellFactory);
  deployer.deploy(BidderAccount);
};
