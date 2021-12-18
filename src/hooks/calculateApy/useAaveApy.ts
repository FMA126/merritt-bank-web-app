import { useEffect, useState } from "react"
import { BigNumber, Contract, ethers } from 'ethers';
import { DAI_ADDRESS } from "../../constants";

export const useAaveApy = (contract: any) => {
    const [apy, setApy] = useState<any>(0);

    useEffect(() => {
        const getAaveApy = async (AaveLendingPoolContract: Contract): Promise<BigNumber> => {
            // Reference => https://docs.aave.com/developers/guides/apy-and-apr
            if (AaveLendingPoolContract) {
                const DAI = DAI_ADDRESS;
                const ray = 10 ** 27;
                const { currentLiquidityRate } = await AaveLendingPoolContract.getReserveData(DAI);
                const depositAPR = currentLiquidityRate / ray;
                const depositAPY = ethers.utils.parseUnits(((((1 + (depositAPR / (365 * 24 * 60 * 60))) ** (365 * 24 * 60 * 60)) - 1) * 100).toPrecision(3));
                setApy(depositAPY);
                return depositAPY;
            }
            return BigNumber.from(0);
        }

        getAaveApy(contract);
    }, [contract]);

    return apy;
}