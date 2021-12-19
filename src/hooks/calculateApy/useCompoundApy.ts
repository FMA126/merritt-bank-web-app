import { useEffect, useState } from "react"
import { BigNumber, ethers, Signer } from 'ethers';
import { CDAI_ADDRESS } from "../../constants";
import { FormatTypes, Interface } from "ethers/lib/utils";
import { CDaiAbi } from "../../abis/CDaiAbi";

export const useCompoundApy = (signer: Signer | null) => {
    const [compoundApy, setCompoundApy] = useState(BigNumber.from('0'))
    const getCompoundApy = async () => {
        // Reference => https://docs.aave.com/developers/guides/apy-and-apr
        if (signer?._isSigner) {
            const iface = new Interface(CDaiAbi.abi);
            const cDaiAbi = iface.format(FormatTypes.full);
            const cDaiContract = new ethers.Contract(CDAI_ADDRESS, cDaiAbi, signer);
            const ethMantissa = 1e18;
            const blocksPerDay = 6570; // 13.15 seconds per block
            const daysPerYear = 365;
            const supplyRatePerBlock = await cDaiContract.supplyRatePerBlock();
            const depositApy = ethers.utils.parseUnits(((((Math.pow((supplyRatePerBlock / ethMantissa * blocksPerDay) + 1, daysPerYear))) - 1) * 100).toPrecision(3));
            setCompoundApy(depositApy);

        }
    }
    useEffect(() => {
        getCompoundApy();
    }, [signer, setCompoundApy]);

    return compoundApy;
}