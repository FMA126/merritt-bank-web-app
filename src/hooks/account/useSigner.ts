import { Dispatch, SetStateAction, useEffect } from "react"
import { Signer } from 'ethers';
import { Web3Provider } from "@ethersproject/providers";

export const useSigner = (provider: Web3Provider | null, setSigner: Dispatch<SetStateAction<Signer | null>>) => {
    useEffect(() => {
        if (provider) {
            console.log('signer effect', provider)
            setSigner(provider.getSigner());
        }
    }, [provider, setSigner]);

}