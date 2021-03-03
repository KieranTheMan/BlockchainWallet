const Wallet = artifacts.require("Wallet");// object that represents smart contract

// export a function 
module.exports = async function (deployer, _network, accounts) { //get deployer and get ganash address
await deployer.deploy(Wallet, [accounts[0], accounts[1], accounts[2]], 2);
const wallet = await Wallet.deployed();// use this to point to wallet
await web3.eth.sendTransaction({from: accounts[0], to: wallet.address, value: 10000});//use web3 to add fake eth
};
