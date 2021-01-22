import React, {useEffect, useState} from 'react';
import {getWeb3, getWallet} from './U-tils.js';
import Header from './Header.js';
import NewTransfer from './NewTransfer.js';


function App() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [wallet, setWallet] = useState(undefined);
  const [approvers, setApprovers] = useState([]);
  const [quorum, setQuorum] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const web3 = getWeb3();
      const accounts = await web3.eth.getAccounts(); //get list of accounts from Ganash
      const wallet = await getWallet(web3);
      const approvers = await wallet.methods.getApprovers().call();//'methods' key to access function of smart contract
      const quorum = await wallet.methods.quorum().call();// call is used to read data from the blockchain
      setWeb3(web3);
      setAccounts(accounts);
      setWallet(wallet);
      setApprovers(approvers);
      setQuorum(quorum);
    };
    init();
  }, []);

  



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
      <NewTransfer createTranser={createTransfer}/>
    </div>
  );
}

export default App;
