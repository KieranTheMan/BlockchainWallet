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
         //tests are inside a it block
         it('should have correct approvers and quorum', async () => {
            const approvers = await wallet.getApprovers()
            const quorum = await wallet.quorum();
    
            //if all aassertions tests fail everything else fails.
            assert(approvers.length === 3);
            assert(approvers[0] === accounts[0]);
            assert(approvers[1] === accounts[1]);
            assert(approvers[2] === accounts[2]);
            assert(quorum.toNumber() === 2);
        })

        it('should create transfers', async () => {

            await wallet.createTransfer(accounts[5], 100, {from: accounts[0]});
            const transfers = await wallet.getTransfers();

            assert(transfers.length === 1);
            assert(transfers[0].id === '0');
            assert(transfers[0].amount === '100');
            assert(transfers[0].to === accounts[5]);
            assert(transfers[0].approvals === '0');
            assert(transfers[0].sent === false);
        });
});