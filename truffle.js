require('dotenv').config();
var HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  networks: {
    
    ropsten: {
      provider: function() {
       var hdWallet = new HDWalletProvider(process.env.MNEMONIC, "https://ropsten.infura.io/v3/"+process.env.INFURA_API_KEY);
       console.log("---------------------------------------------");
       console.log(hdWallet.getAddress());
       return hdWallet;
      },
      network_id: 3
    },

    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    }   
  }

};