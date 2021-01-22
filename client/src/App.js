import React, {useEffect, useState} from 'react';
import {getWeb3, getWallet} from './U-tils.js';
import Header from './Header.js';
import NewTransfer from './NewTransfer.js';
import Transferlist from './TransferList.js';


function App() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [wallet, setWallet] = useState(undefined);
  const [approvers, setApprovers] = useState([]);
  const [quorum, setQuorum] = useState(undefined);
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    const init = async () => {
      const web3 = getWeb3();
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

  const createTransfer = transfer => {
    //using web3 to asscess the smartcontract via wallet veribal
    wallet.methods
    .createTranser(transfer.amount, transfer.to)
    .send({from: accounts[0]});//to modifie data on contract using web3
  }


  if( typeof web3 === 'undefined'
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
      <Transferlist transferList={transfers}/>
    </div>
  );
}

export default App;
