import { useEffect, useState } from "react"
import { ethers } from 'ethers';

export const useDaiBalance = (contract: any, provider: any) => {
    const [balance, setBalance] = useState<any>(null);

    useEffect(() => {
        const getBalance = async () => {
            console.log(provider, contract)
            const accounts = await provider?.listAccounts();
            if (accounts & contract) {
                const address = accounts[0];
                const daiBalance = await contract.balanceOf(address);
                setBalance(ethers.utils.formatEther(daiBalance.toString()));
            }
        }

        getBalance();
    }, [contract, provider]);

    return balance;
}