# Defi Yield Aggregator (Front End)

This project is an implementation of [dappuniversity](https://github.com/dappuniversity/yield-aggregator)'s project using a different techstack.

This project is a simple decentrialized app where a user can deposit DAI into our smart contract. Once funds are deposited, the contract compares the interest rate of Compound & Aave, and deposits funds to whichever has the highest interest rate. The user can rebalance his/her funds to ensure that the funds are still currently in the higher interest rate protocol, and can also withdraw at any time.

## Technology Stack & Tools

- Solidity (Writing Smart Contract)
- Javascript (React & Testing)
- [Ethers](https://docs.ethers.io/v5/) (BlockChain Interaction)
- [Hardhat](https://hardhat.org/) (Development Framework)
- [Alchemy](https://www.alchemy.com/) (Forking Ethereum Mainnet)
- [https://metamask.io/](https://metamask.io/) (Ethereum Wallet)
- Openzeppelin (Solidity Math)

## Setting Up
1. Install
>$ yarn install
2. Start Local BlockChain
- From [HardHat App](https://github.com/FMA126/merritt-bank-ethereum) start and deploy the contracts
3. Launch Metamask In Browser
- Log into metamask
- Change network to local network the hardhat app is serving
- Import the first account from hardhat app
4. Start React App
> $ yarn start

## Testing
> $ yarn test

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

