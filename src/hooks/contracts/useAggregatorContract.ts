import { useEffect, useState } from "react"
import { ethers } from 'ethers';
import { FormatTypes, Interface } from "ethers/lib/utils";

import { AggregatorAbi } from '../../abis/AggregatorAbi';
import { AGGREGATOR_ADDRESS } from "../../constants";

export const useAggregatorContract = (signer: any) => {
    const [contract, setContract] = useState<any>(null);

    useEffect(() => {
        const iface = new Interface(AggregatorAbi.abi);
        const aggregatorAbi = iface.format(FormatTypes.full);
        const AggregatorContract = new ethers.Contract(AGGREGATOR_ADDRESS, aggregatorAbi, signer)
        setContract(AggregatorContract);
    }, [signer]);

    return contract;
}