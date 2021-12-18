import { useEffect, useState } from "react"
import { ethers } from 'ethers';

export const useSigner = (provider: any) => {
    const [signer, setSigner] = useState<any>(null);

    useEffect(() => {
        const getSigner = () => {
            return provider?.getSigner();
        }
        const signer0 = getSigner()
        setSigner(signer0);
    }, [provider]);

    return signer;
}