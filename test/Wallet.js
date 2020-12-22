//artifactst is a truffle object that will alow us to interact with smart contract 
const Wallet = artifacts.require('Wallet');

//truffle blockchain generates 10 addreess with fake either, (accounts)
contract('Wallet', (accounts) => {
    let wallet;
        //this will callback befor each of the test
        beforeEach(async () => {
            //deploy a new SC to the test object of truffle, we can interact with smart C wallet
            wallet = await Wallet.new([accounts[0], accounts[1], accounts[2]], 2);
            //injects a wweb3 file to send fake ether to smart contract.
            await web3.eth
            .sendTransaction({
            from: accounts[0], to: wallet.address, value: 1000});
        });
        
});