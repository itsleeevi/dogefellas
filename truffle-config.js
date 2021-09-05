//var HDWalletProvider = require("truffle-hdwallet-provider");
//require('dotenv').config()

module.exports = {
  compilers: {
    solc: {
      version: "0.8.7",
    },
  },
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: "./src/artifacts/",
  //  plugins: [
  //    'truffle-plugin-verify'
  //  ],
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    develop: {
      port: 9545,
      gas: 6721975,
    },
    ropsten: {
      //      provider: function() {
      //        return new HDWalletProvider(
      //          process.env.MNEMONIC,
      //          `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`
      //        )
      //      },
      network_id: 3,
      gas: 4000000, //make sure this gas allocation isn't over 4M, which is the max
    },
    mainnet: {
      networkCheckTimeout: 10000,
      //      provider: function() {
      //        return new HDWalletProvider(
      //          process.env.MNEMONIC,
      //          `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`
      //        )
      //      },
      network_id: 1,
      gas: 4000000, //make sure this gas allocation isn't over 4M, which is the max
      gasPrice: 50000000000, // 50 gwei
      confirmations: 2,
    },
  },
  //  api_keys: {
  //    etherscan: process.env.ETHERSCAN_KEY
  //  }
};
