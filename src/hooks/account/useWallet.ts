import { ethers, Signer } from "ethers";
import { useEffect, useState } from "react"

import { Web3Provider } from "@ethersproject/providers";

declare let window: any;

export const useWallet = (): Account => {
    const [provider, setProvider] = useState<Web3Provider>({} as Web3Provider)
    const [signer, setSigner] = useState<Signer>({} as Signer);
    const [connectedAccount, setConnectedAccount] = useState<string>('');
    const [connectedStatus, setConnectedStatus] = useState<boolean>(false)
    useEffect(() => {
        const getAccounts = async () => {
            console.log('provider')
            if (window.ethereum) {
                const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
                const accounts = await web3Provider.listAccounts();
                setProvider(web3Provider);
                setSigner(web3Provider?.getSigner());
                setConnectedAccount(accounts[0]);
                setConnectedStatus(true);
            }
        }
        getAccounts()
    }, [])

    return {
        provider,
        signer,
        connectedAccount,
        connectedStatus,
    }
}

export type Account = {
    provider: Web3Provider,
    signer: Signer,
    connectedAccount: string,
    connectedStatus: boolean,
}