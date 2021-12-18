import { useEffect, useState } from "react"
import { ethers } from 'ethers';
import { FormatTypes, Interface } from "ethers/lib/utils";

import { DaiAbi } from '../../abis/DaiAbi';
import { DAI_ADDRESS } from "../../constants";

export const useDaiContract = (signer: any) => {
    const [contract, setContract] = useState<any>(null);

    useEffect(() => {
        const iface = new Interface(DaiAbi.abi);
        const daiAbi = iface.format(FormatTypes.full);
        const daiContract = new ethers.Contract(DAI_ADDRESS, daiAbi, signer)
        setContract(daiContract);
    }, [signer]);

    return contract;
}