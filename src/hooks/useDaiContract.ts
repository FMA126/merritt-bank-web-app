import { useEffect, useState } from "react"
import { ethers } from 'ethers';
import { FormatTypes, Interface } from "ethers/lib/utils";

import { DaiAbi } from '../abis/DaiAbi';

export const useDaiContract = (signer: any) => {
    const [contract, setContract] = useState<any>(null);

    useEffect(() => {
        const iface = new Interface(DaiAbi.abi);
        const daiAbi = iface.format(FormatTypes.full);
        const daiContract = new ethers.Contract('0x6b175474e89094c44da98b954eedeac495271d0f', daiAbi, signer)
        setContract(daiContract);
    }, [signer]);

    return contract;
}