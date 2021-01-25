import React, {useEffect, useState} from 'react';
import {getWeb3, getWallet} from './U-tils.js';
import Header from './Header.js';
import NewTransfer from './NewTransfer.js';
import TransferList from './TransferList.js';


function App() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [wallet, setWallet] = useState(undefined);
  const [approvers, setApprovers] = useState([]);
  const [quorum, setQuorum] = useState(undefined);
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts(); //get list of accounts from Ganash
      const wallet = await getWallet(web3);
      const approvers = await wallet.methods.getApprovers().call();//'methods' key to access function of smart contract
      const quorum = await wallet.methods.quorum().call();// call is used to read data from the blockchain
      const transfers = await wallet.methods.getTransfers().call();
      setWeb3(web3);
      setAccounts(accounts);
      setWallet(wallet);
      setApprovers(approvers);
      setQuorum(quorum);
      setTransfers(transfers);
    };
    init();
  }, []);
//using web3 to asscess the smartcontract via wallet veribal
  const createTransfer = transfer => {
    wallet.methods
    .createTransfer(transfer.amount, transfer.to)
    .send({from: accounts[0]});//to modifie data on contract using web3
  }

  const approveTransfer = transferId => {
    wallet.methods
    .approveTransfer(transferId)
    .send({from: accounts[0]});
  }


  if(typeof web3 === 'undefined'
    || typeof accounts === 'undefined'
    || approvers.length === 0
    || typeof quorum === 'undefined'
    || typeof wallet === 'undefined') {

    return <div>Loading...</div>
  }
    return (
    <div>
      MultiSig Dapp
      <Header approvers={approvers} quorum={quorum}/>
      <NewTransfer createTransfer={createTransfer}/>
      <TransferList transfers={transfers} approveTransfer={approveTransfer}/>
    </div>
  );
}

export default App;
