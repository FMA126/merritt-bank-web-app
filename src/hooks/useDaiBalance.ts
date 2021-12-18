import { useEffect, useState } from "react"
import { ethers } from 'ethers';

export const useDaiBalance = (contract: any, provider: any) => {
    const [balance, setBalance] = useState<any>(null);

    useEffect(() => {
        const getBalance = async () => {
            const accounts = await provider?.listAccounts();
            console.log(provider, contract, accounts)
            const daiBalance = await contract?.balanceOf(accounts[0]);
            setBalance(daiBalance ? ethers.utils.formatEther(daiBalance.toString()) : null);
        }
        if (contract & provider) {
            getBalance();
        }
    }, [contract, provider]);

    return balance;
}