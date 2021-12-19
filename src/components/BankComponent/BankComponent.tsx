import { BigNumber, Contract } from 'ethers';
import { formatEther, parseEther } from 'ethers/lib/utils';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Account } from '../../hooks/account/useWallet';
import { useAaveApy } from '../../hooks/calculateApy/useAaveApy';
import { useCompoundApy } from '../../hooks/calculateApy/useCompoundApy';
import { useAggregatorContract } from '../../hooks/contracts/useAggregatorContract';
import { createDaiContract } from '../../contracts/createDaiContract';

type BankProps = {
    account: Account,
}

export const BankComponent = (props: BankProps) => {
    const { signer, connectedAccount} = props.account;
    const [daiContract, setDaiContract] = useState({} as Contract)
    useMemo(() => {
        setDaiContract(createDaiContract(signer));
    },[])
    const aggregatorContract = useAggregatorContract(signer);
    const [ daiBalance, setDaiBalance] = useState<string>('0');
    useEffect(() => {
        const fetchDaiBalance = async () => {
            console.log('fetching dai balance')
            const balance = await daiContract.balanceOf(connectedAccount);
            setDaiBalance(formatEther(balance));
        }
        fetchDaiBalance();
    },[daiBalance]);
    const aaveApy = useAaveApy(signer);
    const compoundApy = useCompoundApy(signer);
    const [ isApproved, setIsApproved ] = useState(false);
    const [depositAmount, setDepositAmount] = useState(0);
    const [aggregatorBalance, setAggregatorBalance] = useState('0')
    useEffect(() => {
        const fetchAggregatorBalance = async () => {
            const balance = await aggregatorContract.amountDeposited();
            setAggregatorBalance(formatEther(balance));
        }
        fetchAggregatorBalance()
    }, [aggregatorBalance])

      const handleDepositInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDepositAmount(Number.parseFloat(value));
  }

  const handleDeposit = async () => {
    try {
      depositAggregator()
      
    } catch (err) {
        console.error(err)
    }
}

const depositAggregator = async () => {
    if(!isApproved) {
        const approvalStatus = await daiContract.approve(aggregatorContract.address, parseEther(depositAmount.toString()));
        setIsApproved(approvalStatus);
    }
    const deposit = await aggregatorContract.deposit(parseEther(depositAmount.toString()), compoundApy, aaveApy);
    const balance = await aggregatorContract.amountDeposited();
      setAggregatorBalance(formatEther(balance));
}
    return (
        <div>
            <span>bank</span>
            <div>DAI Balance: {daiBalance}</div>
            <div>Aave APY: {`${formatEther(aaveApy)} %`}</div>
            <div>Compound APY: {`${formatEther(compoundApy)} %`}</div>
            <div>Aggregator Balance: {aggregatorBalance}</div>
            <div>
                <input type="number" placeholder='Amount to deposit' onChange={handleDepositInputChange} value={depositAmount || 0}></input>
                <button onClick={handleDeposit}>Deposit</button>
            </div>
        </div>
    )
}