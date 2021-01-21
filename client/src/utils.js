//cnfiguer web3 to comunicate with smart contract from the front end

import Web3 from 'web3';
import Wallet from './contracts/Wallet.json'
//web3 to connect smart contract to frontend
//conection to etherum local blockchain, initialisation logic
const getWeb3 = () => {
    return new Web3('http://localhost:9545') // truffle local ganash(built in blockchain of truffle) host, pass url to node that runs development blockchain
};

//contract instance for smart contract, to interact with contract
const getWallet = async web3 => {
    const networkId = await web3.eth.net.getId(); // to get neywork ID execract info from contract abstration
    const contractDeployment = Wallet.networks[networkId];// saves all the data of smart contract deployment
    return new web3.eth.Contract(
        Wallet.abi,// defines the funtion signature of smat contract
        contractDeployment && contractDeployment.address
    );
}

export {getWeb3, getWallet};