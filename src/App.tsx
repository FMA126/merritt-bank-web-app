import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';
import { FormatTypes, Interface } from '@ethersproject/abi';
declare let window: any;

function App() {
  const [ balance, setBalance ] = useState<number | null>(null);
  const [ account, setAccount ] = useState<any>(null);
  const [ contract, setContract ] = useState<any>(null);
  const [ count, setCount ] = useState<any>(null);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  // const account = provider.listAccounts()
  console.log(account)
  const signer = provider.getSigner();
  let countAbi: any;

  const getAccount = async () => {
    const account = await provider.listAccounts();
    setAccount(account[0])
  }

  const getBalance = async () => {
    const bal = await provider.getBalance(account);
    setBalance(parseFloat(ethers.utils.formatEther(bal)));
  }

  const getContract = async () => {
    const iface = new Interface(jsonAbi);
    countAbi = iface.format(FormatTypes.full);
    const countContract = new ethers.Contract('0x5fbdb2315678afecb367f032d93f642f64180aa3', countAbi, provider);
    setContract(countContract);
  }

  const getCount = async () => {
    console.log(contract)
    const count = await contract.getCount()
    const cnt = ethers.utils.formatUnits(count, 0)
    setCount(cnt)
  }
  const handleIncrement = async () => {
    const countWithSigner = await contract.connect(signer);
    await countWithSigner.increment();
  }

  return (
    <div className="App">
      <span>bank</span>
      <div>Balance: {balance}</div>
      <div>Account: {account}</div>
      <div>Count: {count}</div>
      <button onClick={getBalance}>Get Balance</button>
      <button onClick={getAccount}>Get Account</button>
      <button onClick={getCount}>Get Count</button>
      <button onClick={getContract}>Get Contract</button>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
}

const jsonAbi = `[
  {
    "inputs": [],
    "name": "count",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "increment",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]`

export default App;
