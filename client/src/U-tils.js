//cnfiguer web3 to comunicate with smart contract from the front end

import Web3 from 'web3';
import Wallet from './contracts/Wallet.json';
//web3 to connect smart contract to frontend
//conection to etherum local blockchain, initialisation logic
//intergrate metaMask to sign transations on the mainNet
    //return new Web3('http://localhost:9545') // truffle local ganash(built in blockchain of truffle) host, pass url to node that runs development blockchain

const getWeb3 = () => {    
    return new Promise((resolve, reject) => {
        window.addEventListener('load', async() => {//the load event garentees that all the javascript has been loaded and chrome extentions
            //Mordn dapp browsers
            if(window.ethereum) {
                const web3 = new Web3(window.ethereum);// pass a provider object injected by metamask
                try {
                    //Request Access if needed 
                    await window.ethereum.enable();
                    //enable to acess dapp, Accounts are exsposed
                    resolve(web3);
                } catch(error) {
                    reject(error);// if no to access promise will be rejected
                }
            }
            //Legacy dapp browsers if the user is using a old version on metaMask
            else if (window.web3) { 
                const web3 = window.web3;
                resolve(web3); // window web3 will inject web3 from metamask
            } 
            //Fallback to localHost: use dev console port by default...
            else {
                const provider = new Web3.providers.HttpProvider(
                    'http://localhost:9545'
                );
                const web3 = new Web3(provider);
                resolve(web3);
            }
        });
    });
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