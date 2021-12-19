import { useEffect, useState } from "react"
import { BigNumber, ethers, Signer } from 'ethers';
import { AAVE_LENDING_POOL_ADDRESS, DAI_ADDRESS } from "../../constants";
import { FormatTypes, Interface } from "ethers/lib/utils";
import { AaveLendingPoolAbi } from "../../abis/AaveLendingPoolAbi";

export const useAaveApy = (signer: Signer) => {
    const [aaveApy, setAaveApy] = useState(BigNumber.from('0'))
    const getAaveApy = async () => {
        // Reference => https://docs.aave.com/developers/guides/apy-and-apr
        if (signer?._isSigner) {
            const iface = new Interface(AaveLendingPoolAbi.abi);
            const aaveLendingPoolAbi = iface.format(FormatTypes.full);
            const aaveLendingPoolContract = new ethers.Contract(AAVE_LENDING_POOL_ADDRESS, aaveLendingPoolAbi, signer);
            const DAI = DAI_ADDRESS;
            const ray = 10 ** 27;
            const { currentLiquidityRate } = await aaveLendingPoolContract.getReserveData(DAI);
            const depositApr = currentLiquidityRate / ray;
            const depositApy = ethers.utils.parseUnits(((((1 + (depositApr / (365 * 24 * 60 * 60))) ** (365 * 24 * 60 * 60)) - 1) * 100).toPrecision(3));
            setAaveApy(depositApy);
        }
    }
    useEffect(() => {
        getAaveApy();
    }, [signer]);

    return aaveApy;
}