import { Dispatch, SetStateAction, useEffect } from "react"
import { ethers } from 'ethers';
import { Web3Provider } from "@ethersproject/providers";

declare let window: any;

export const useWeb3Provider = (setProvider: Dispatch<SetStateAction<Web3Provider | null>>, setConnectedAccount: Dispatch<SetStateAction<string | null>>): void => {
    // const [web3Provider, setWeb3Provider] = useState<any>(null);

    // const requestAccount = async () => {
    //     if (!window.ethereum) {
    //         const acct = await window.ethereum.request({ method: 'eth_requestAccounts' }).then(() => console.log());
    //     }

    // }

    const getProvider = () => {
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(web3Provider);
        return web3Provider;
    }

    const getAccount = async (provider: Web3Provider) => {
        const accounts = await provider.listAccounts();
        console.log(accounts)
        setConnectedAccount(accounts[0]);
    }

    useEffect(() => {
        // requestAccount();
        const web3Provider = getProvider();
        getAccount(web3Provider);
        console.log('provider effect', web3Provider)

    }, []);

}
