import { ethers, Signer } from 'ethers';
import { FormatTypes, Interface } from "ethers/lib/utils";

import { AggregatorAbi } from '../abis/AggregatorAbi';
import { AGGREGATOR_ADDRESS } from "../constants";

export const createAggregatorContract = (signer: Signer) => {
    const aggregatorAbi = new Interface(AggregatorAbi.abi).format(FormatTypes.full);
    return new ethers.Contract(AGGREGATOR_ADDRESS, aggregatorAbi, signer);
}