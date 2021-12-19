import { ethers, Signer } from 'ethers';
import { FormatTypes, Interface } from "ethers/lib/utils";

import { DaiAbi } from '../abis/DaiAbi';
import { DAI_ADDRESS } from "../constants";

export const createDaiContract = (signer: Signer) => {
    const iface = new Interface(DaiAbi.abi);
    const daiAbi = iface.format(FormatTypes.full);
    console.log('dia contract created');
    return new ethers.Contract(DAI_ADDRESS, daiAbi, signer);



    // const getDaiBalance = async (daiContractArg: Contract, connAccountArg: string) => {
    //     const balance = await daiContractArg.balanceOf(connAccountArg);
    //     console.log('get dai balance', balance)
    //     setDaiBalance(ethers.utils.formatEther(balance.toString()));
    //     return balance;
    // }

    // const getAllowance = async (connAccountArg: string, daiContractArg: Contract, aggContractArg: Contract) => {
    //     const aggregatorAddress = aggContractArg?.address;
    //     const allowance = await daiContractArg.allowance(connAccountArg, aggregatorAddress)
    //     console.log(allowance)
    //     setApprovalStatus(allowance);
    //     return allowance;
    // }
    // console.log('diaContract effect', daiContract, signer)
    // if (!daiContractStatus && signer && connectedAccount) {
    //     console.log('dai contract status false')
    //     createDaiContract(signer);
    // }
    // if (daiContractStatus && daiContract && connectedAccount) {
    //     console.log('dai contract status true getBalance')
    //     getDaiBalance(daiContract, connectedAccount);

    // }
    // if (daiContractStatus && connectedAccount && daiContract && aggregatorContract) {
    //     console.log('dai contract status true getAllowance')
    //     getAllowance(connectedAccount, daiContract, aggregatorContract);
    // }
}