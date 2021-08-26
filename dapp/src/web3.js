import Web3 from "web3";
import Benton from "./abis/Benton.json";

export let web3;

export const getBentonContract = async () => {
  const networkId = await web3.eth.net.getId();
  const dentonData = Benton.networks[networkId];
  if (!dentonData) {
    return null;
  }

  const benton = new web3.eth.Contract(Benton.abi, dentonData.address);
  return benton;
};

export const getAccount = async () => {
  const accounts = await web3.eth.getAccounts();
  return accounts;
};

export const initialWeb3 = async (callback) => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    callback();
  } else if (web3) {
    web3 = new Web3(web3.currentProvider);
    callback();
  } else {
    window.alert(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
};
