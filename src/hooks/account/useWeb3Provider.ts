import { useEffect, useState } from "react"
import { ethers } from 'ethers';

declare let window: any;

export const useWeb3Provider = () => {
    const [provider, setProvider] = useState<any>(null);

    const requestAccount = async () => {
        if (!window.ethereum) {
            const acct = await window.ethereum.request({ method: 'eth_requestAccounts' }).then(() => console.log());
        }

    }

    useEffect(() => {
        requestAccount();
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(web3Provider);
    }, []);

    return provider;
}
