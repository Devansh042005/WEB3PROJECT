// https://eth-sepolia.g.alchemy.com/v2/biqcXdwSRcGo_OSJRMMg7tuN2wJHEZ5O
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/biqcXdwSRcGo_OSJRMMg7tuN2wJHEZ5O',
      accounts: ['995cf700cfd8a77c5630126388f2287524efc2bbf3bf909cb8fdb0024f7b9bf6']
    }
  }
};
