import { ethers, Signer } from 'ethers';
import { FormatTypes, Interface } from "ethers/lib/utils";

import { DaiAbi } from '../abis/DaiAbi';
import { DAI_ADDRESS } from "../constants";

export const createDaiContract = (signer: Signer) => {
    const iface = new Interface(DaiAbi.abi);
    const daiAbi = iface.format(FormatTypes.full);
    return new ethers.Contract(DAI_ADDRESS, daiAbi, signer);
}