import { useEffect, useState } from "react"
import { ethers } from 'ethers';
import { FormatTypes, Interface } from "ethers/lib/utils";

import { AaveLendingPoolAbi } from '../../abis/AaveLendingPoolAbi';
import { AAVE_LENDING_POOL_ADDRESS } from "../../constants";

export const useAaveLendingPoolContract = (signer: any) => {
    const [contract, setContract] = useState<any>(null);

    useEffect(() => {
        const iface = new Interface(AaveLendingPoolAbi.abi);
        const aaveLendingPoolAbi = iface.format(FormatTypes.full);
        const aaveLendingPoolContract = new ethers.Contract(AAVE_LENDING_POOL_ADDRESS, aaveLendingPoolAbi, signer)
        setContract(aaveLendingPoolContract);
    }, [signer]);

    return contract;
}