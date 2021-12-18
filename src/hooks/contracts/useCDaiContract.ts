import { useEffect, useState } from "react"
import { ethers } from 'ethers';
import { FormatTypes, Interface } from "ethers/lib/utils";

import { CDaiAbi } from '../../abis/CDaiAbi';
import { CDAI_ADDRESS } from "../../constants";

export const useCDaiContract = (signer: any) => {
    const [contract, setContract] = useState<any>(null);

    useEffect(() => {
        const iface = new Interface(CDaiAbi.abi);
        const cDaiAbi = iface.format(FormatTypes.full);
        const cDaiContract = new ethers.Contract(CDAI_ADDRESS, cDaiAbi, signer)
        setContract(cDaiContract);
    }, [signer]);

    return contract;
}