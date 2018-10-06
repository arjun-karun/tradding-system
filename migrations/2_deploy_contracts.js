var SellFactory = artifacts.require("./SellFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(SellFactory);
};
